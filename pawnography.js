const settings = {
	async: true,
	crossDomain: true,
	url: 'https://chess-puzzles2.p.rapidapi.com/random?number_of_puzzles=30',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '02f3b69c35msh4a0aadf57595284p121757jsn8b3c7e60e543',
		'X-RapidAPI-Host': 'chess-puzzles2.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

var chessboard = document.getElementById('chessboard');
   for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
         var chessSquare = document.createElement('div');
         chessSquare.className = 'chess-square';
         if ((i + j) % 2 == 0) {
            chessSquare.style.backgroundColor = '#000';
         }
         chessboard.appendChild(chessSquare);
      }
    }
