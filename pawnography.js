const settings = {
	async: true,
	crossDomain: true,
	url: 'https://chess-puzzles2.p.rapidapi.com/advanced?rating=1200&number_of_moves=4&number_of_puzzles=10',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '02f3b69c35msh4a0aadf57595284p121757jsn8b3c7e60e543',
		'X-RapidAPI-Host': 'chess-puzzles2.p.rapidapi.com'
	}
};

// use console.log(fetch(url)) to make sure fetch is promise based
fetch(settings.url, {
   method: settings.method,
   headers: {
     'X-RapidAPI-Key': settings.headers['X-RapidAPI-Key'],
     'X-RapidAPI-Host': settings.headers['X-RapidAPI-Host']
   }
 })
   .then(res => res.json())
   .then(data => console.log(data))
   .catch(error => console.log('ERROR: ', error));