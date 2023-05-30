const settings = {
	async: true,
	crossDomain: true,
	url: 'https://chess-puzzles2.p.rapidapi.com/advanced?rating=1200&number_of_moves=4&opening_family=Kings_Gambit_Accepted&opening_variation=Kings_Gambit_Accepted_Abbazia_Defense&themes=kingsideAttack%2Cmiddlegame&theme_search_type=AND&number_of_puzzles=5',
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '02f3b69c35msh4a0aadf57595284p121757jsn8b3c7e60e543',
	  'X-RapidAPI-Host': 'chess-puzzles2.p.rapidapi.com'
	}
  };
  
  // GET & POST Requests
  $(document).ready(function() {
	setTimeout(function() {
	  const fenValue = 'r4rk1/ppp1q2p/8/3Pnpp1/2PPBpb1/2P5/P1Q3PP/R1B1R1K1 w - - 0 16';
	  const encodedFen = encodeURIComponent(fenValue);
  
	  $.ajax({
		url: 'https://chess-puzzles2.p.rapidapi.com/advanced?fen=' + encodedFen,
		method: 'GET',
		headers: {
		  'X-RapidAPI-Key': '02f3b69c35msh4a0aadf57595284p121757jsn8b3c7e60e543',
		  'Content-Type': 'application/json',
		  'Accept': 'application/json'
		},
		success: function(response) {
		  console.log('GET Response:', response);
  
		  const requestData = {
			fen: fenValue,
			rating: 1200,
			number_of_moves: 4,
			opening_family: 'Kings_Gambit_Accepted',
			opening_variation: 'Kings_Gambit_Accepted_Abbazia_Defense',
			themes: 'kingsideAttack,middlegame',
			theme_search_type: 'AND',
			number_of_puzzles: 5
		  };
  
		  $.ajax({
			url: 'https://chess-puzzles2.p.rapidapi.com/advanced',
			method: 'POST',
			headers: {
			  'X-RapidAPI-Key': '02f3b69c35msh4a0aadf57595284p121757jsn8b3c7e60e543',
			  'Content-Type': 'application/json',
			  'Accept': 'application/json'
			},
			data: JSON.stringify(requestData),
			success: function(response) {
			  console.log('POST Response:', response);
  
			  for (let i = 0; i < response.length; i++) {
				const puzzle = response[i];
				console.log('Puzzle', i + 1, ':', puzzle);
			  }
			},
			error: function(xhr, status, error) {
			  console.log('POST Error:', error);
			}
		  });
		},
		error: function(xhr, status, error) {
		  console.log('GET Error:', error);
		}
	  });
	}, 2000);
  });