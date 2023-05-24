var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};
function preventDefault(e) {
    e.preventDefault()
}
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode])
        return preventDefault(e),
        !1
}
var supportsPassive = !1;
try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function() {
            supportsPassive = !0
        }
    }))
} catch (e) {}
var wheelOpt = !!supportsPassive && {
    passive: !1
}
  , wheelEvent = "onwheel"in document.createElement("div") ? "wheel" : "mousewheel";
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, !1),
    window.addEventListener(wheelEvent, preventDefault, wheelOpt),
    window.addEventListener("touchmove", preventDefault, wheelOpt),
    window.addEventListener("keydown", preventDefaultForScrollKeys, !1),
    document.ontouchmove = function(e) {
        e.preventDefault()
    }
}
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, !1),
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt),
    window.removeEventListener("touchmove", preventDefault, wheelOpt),
    window.removeEventListener("keydown", preventDefaultForScrollKeys, !1),
    document.ontouchmove = function(e) {
        return !0
    }
}
const ratingArr = [[545, 1199], [1200, 1599], [1600, 1999], [2e3, 2300], [2300, 2500], [2500, 3200]];
let apiKey;
var board = null
  , game = new Chess;
let puzzlesArr = []
  , move_arr = []
  , move_index = 0;
var whiteSquareGrey = "#aca7a7"
  , blackSquareGrey = "#325e59";
let rating, family, variation, highestMove = 0, hintCount = 0, isPlayersTurn = !1, puzzleHasLoaded = !0, hasReloadedAfterError = !1, computerIsMoving = !1;
const body = document.getElementById("body");
function onDragStart(e, o, t, r) {
    if (move_arr.length == highestMove || move_index != highestMove)
        return !1;
    if ("w" === game.turn() && -1 !== o.search(/^b/) || "b" === game.turn() && -1 !== o.search(/^w/))
        return !1;
    disableScroll();
    var n = game.moves({
        square: e,
        verbose: !0
    });
    if (0 !== n.length)
        for (var a = 0; a < n.length; a++)
            colorSquareLegal(n[a].to)
}
function colorSquareLegal(e) {
    var o = $("#board1 .square-" + e)
      , t = whiteSquareGrey;
    o.hasClass("black-3c85d") && (t = blackSquareGrey),
    o.css("background", t)
}
function removeColorSquareLegal() {
    $("#board1 .square-55d63").css("background", "")
}
function onMouseoverSquare(e, o) {
    var t = game.moves({
        square: e,
        verbose: !0
    });
    if (0 !== t.length) {
        colorSquareLegal(e);
        for (var r = 0; r < t.length; r++)
            colorSquareLegal(t[r].to)
    }
}
function onMouseoutSquare(e, o) {
    removeColorSquareLegal()
}
function onDrop(e, o) {
    if (enableScroll(),
    removeColorSquareLegal(),
    null === game.move({
        from: e,
        to: o,
        promotion: "q"
    }))
        return "snapback";
    e == move_arr[move_index].from && o == move_arr[move_index].to ? ($("#board1 .square-" + e).removeClass("highlight-hint"),
    $("#board1 .square-" + o).removeClass("highlight-hint"),
    move_index - 1 >= 0 && ($("#board1 .square-" + move_arr[move_index - 1].from).removeClass("highlight-computer"),
    $("#board1 .square-" + move_arr[move_index - 1].to).removeClass("highlight-computer")),
    $("#board1 .square-" + e).addClass("highlight-correct"),
    $("#board1 .square-" + o).addClass("highlight-correct"),
    game.move(move_arr[move_index]),
    move_index++,
    highestMove++,
    makeProgress(),
    board.position(game.fen(), !1),
    isPlayersTurn = !1,
    move_arr.length == move_index ? partyyy() : computerMove(move_arr)) : ($("#board1 .square-" + e).addClass("highlight-wrong"),
    $("#board1 .square-" + o).addClass("highlight-wrong"),
    setTimeout((()=>{
        game.undo(),
        board.position(game.fen()),
        $("#board1 .square-" + e).removeClass("highlight-wrong"),
        $("#board1 .square-" + o).removeClass("highlight-wrong")
    }
    ), 300)),
    resetHints()
}
function onSnapbackEnd(e) {
    enableScroll(),
    removeColorSquareLegal(),
    board.position(game.fen())
}
function moveBack() {
    0 != move_index && 0 != highestMove && (resetHints(),
    $("#board1 .square-55d63").removeClass("highlight-computer"),
    $("#board1 .square-55d63").removeClass("highlight-correct"),
    game.undo(),
    move_index -= 1,
    board.position(game.fen()))
}
function redoBack() {
    move_index < highestMove && 0 != highestMove && ($("#board1 .square-55d63").removeClass("highlight-computer"),
    $("#board1 .square-55d63").removeClass("highlight-correct"),
    $("#board1 .square-55d63").removeClass("highlight-hint"),
    game.move(move_arr[move_index]),
    board.position(game.fen()),
    move_index % 2 == 0 ? ($("#board1 .square-" + move_arr[move_index].from).addClass("highlight-computer"),
    $("#board1 .square-" + move_arr[move_index].to).addClass("highlight-computer")) : ($("#board1 .square-" + move_arr[move_index].from).addClass("highlight-correct"),
    $("#board1 .square-" + move_arr[move_index].to).addClass("highlight-correct")),
    move_index += 1)
}
function computerMove(e) {
    computerIsMoving = !0,
    setTimeout((()=>{
        move_index - 1 > 0 && ($("#board1 .square-" + e[move_index - 1].from).removeClass("highlight-correct"),
        $("#board1 .square-" + e[move_index - 1].to).removeClass("highlight-correct")),
        game.move(e[move_index]),
        $("#board1 .square-" + e[move_index].from).addClass("highlight-computer"),
        $("#board1 .square-" + e[move_index].to).addClass("highlight-computer"),
        move_index++,
        highestMove++,
        board.position(game.fen()),
        makeProgress(),
        isPlayersTurn = !0,
        computerIsMoving = !1
    }
    ), 750)
}
function greySquare(e) {
    var o = $("#board1 .square-" + e);
    o.css("background", "red"),
    console.log(o)
}
function giveHint() {
    if (move_index != move_arr.length && 1 == isPlayersTurn && move_index == highestMove) {
        if (0 == hintCount) {
            $("#board1 .square-" + move_arr[move_index].from).addClass("highlight-hint");
            const e = document.createElement("p");
            e.setAttribute("id", "textFirstHint"),
            e.innerHTML = "Move your piece on&nbsp",
            document.getElementById("hintDiv").appendChild(e);
            const o = document.createElement("p");
            o.setAttribute("id", "pieceHint"),
            o.style.color = "var(--hauptfarbe)",
            o.innerHTML = move_arr[move_index].from,
            document.getElementById("hintDiv").appendChild(o)
        } else if (1 == hintCount) {
            $("#board1 .square-" + move_arr[move_index].to).addClass("highlight-hint");
            const e = document.createElement("p");
            e.setAttribute("id", "textSecondHint"),
            e.innerHTML = "&nbspto&nbsp",
            document.getElementById("hintDiv").appendChild(e);
            const o = document.createElement("p");
            o.setAttribute("id", "destinationHint"),
            o.style.color = "var(--hauptfarbe)",
            o.innerHTML = move_arr[move_index].to,
            document.getElementById("hintDiv").appendChild(o)
        }
        hintCount += 1
    }
}
function resetHints() {
    $("#board1 .square-55d63").removeClass("highlight-hint"),
    null !== document.getElementById("textFirstHint") && document.getElementById("textFirstHint").remove(),
    null !== document.getElementById("textSecondHint") && document.getElementById("textSecondHint").remove(),
    null !== document.getElementById("pieceHint") && document.getElementById("pieceHint").remove(),
    null !== document.getElementById("destinationHint") && document.getElementById("destinationHint").remove(),
    hintCount = 0
}
function makeProgress() {
    let e = highestMove / move_arr.length * 100;
    $(".progress-bar").css("width", e + "%")
}
function showLoadingAnimation() {
    resetHints();
    const e = document.createElement("div");
    e.setAttribute("class", "spinner-border"),
    e.setAttribute("id", "spinnerLoad"),
    document.getElementById("progressContainer").appendChild(e)
}
function deleteLoadingAnimation() {
    if (null !== document.getElementById("spinnerLoad"))
        for (let e = 0; e < 3; e++)
            document.getElementById("spinnerLoad").remove()
}
async function getKeys() {
    let e = await fetch("https://b4gcwmacwwh5khbwrtjtffreyi0vnjzu.lambda-url.eu-central-1.on.aws/").then((e=>e.json()));
    apiKey = e.puzzlesApiKey
}
async function fillPuzzlesArr() {
    const e = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "chess-puzzles2.p.rapidapi.com"
        }
    };
    queryRating = document.getElementById("rating").value;
    let o = await fetch("https://chess-puzzles2.p.rapidapi.com/range?min=" + ratingArr[queryRating][0] + "&max=" + ratingArr[queryRating][1] + "&max_deviation=200&number_of_puzzles=10", e).then((e=>e.json()));
    puzzlesArr.push(...o)
}
function animateBoard() {
    $(".board-b72b1").css("border", "0px solid black"),
    $("#board1").css("visibility", "visible");
    let e = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (const o of e)
        for (let e = 1; e < 9; e++)
            e % 2 == 1 ? $(".square-" + o + e).addClass("bounce-in-r") : $(".square-" + o + e).addClass("bounce-in-l");
    setTimeout((()=>{}
    ), 1e3)
}
async function start() {
    showLoadingAnimation(),
    animateBoard(),
    await getKeys(),
    await fillPuzzlesArr(),
    nextPuzzle(),
    deleteLoadingAnimation()
}
async function categoryChange() {
    showLoadingAnimation(),
    puzzlesArr = [],
    await fillPuzzlesArr(),
    nextPuzzle(),
    deleteLoadingAnimation()
}
async function nextPuzzle() {
    if (1 == puzzleHasLoaded && 0 == computerIsMoving) {
        puzzleHasLoaded = !1,
        resetHints(),
        $(".progress-bar").css("width", "0%").text("0%"),
        isPlayersTurn = !1,
        move_index = 0,
        highestMove = 0,
        move_arr = [],
        obj = puzzlesArr[0],
        puzzlesArr.shift(),
        console.log(puzzlesArr.length),
        6 == puzzlesArr.length ? fillPuzzlesArr() : 0 == puzzlesArr.length && await fillPuzzlesArr(),
        rating = obj.rating,
        document.getElementById("ratingValue").innerHTML = rating,
        family = obj.openingFamily,
        board = null,
        "w" == (game = new Chess(obj.fen)).turn() ? (document.getElementById("turnColor").innerHTML = "Black",
        config.orientation = "black") : (document.getElementById("turnColor").innerHTML = "White",
        config.orientation = "white"),
        config.position = obj.fen,
        board = Chessboard("board1", config),
        window.onresize = board.resize,
        puzzleHasLoaded = !0;
        let o = obj.moves;
        for (const t of o) {
            var e = {
                from: t.slice(0, 2),
                to: t.slice(2, 4),
                promotion: "q"
            };
            move_arr.push(e)
        }
        computerMove(move_arr)
    }
}
const chess_div = document.createElement("div");
chess_div.id = "board1",
document.getElementById("boardmain").appendChild(chess_div);
var config = {
    draggable: !0,
    orientation: "white",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapbackEnd: onSnapbackEnd,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare
}
  , $board = (board = Chessboard("board1", config),
$("board1"));
console.log($board),
window.onresize = board.resize;