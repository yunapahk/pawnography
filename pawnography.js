const settings = {
	async: true,
	crossDomain: true,
	url: 'https://chess-puzzles2.p.rapidapi.com/range?min=1200&max=1600&max_deviation=100',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '02f3b69c35msh4a0aadf57595284p121757jsn8b3c7e60e543',
		'X-RapidAPI-Host': 'chess-puzzles2.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

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