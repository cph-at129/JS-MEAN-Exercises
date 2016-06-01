var jokes = [
	{
		id: 1,
		joke: "A day without sunshine is like, night."
	},
	{
		id: 2,
		joke: "At what age is it appropriate to tell my dog that he's adopted?"
	},
	{
		id: 3,
		joke: "I intend to live forever, or die trying"
	}
];

function _getJokes(){
	return jokes;
}
function _getRandomJoke() {
	return jokes[Math.floor(Math.random() * jokes.length)];
}
function _addJoke(joke) {
	var id = jokes.length + 1;
	jokes.push({ id: id, joke: joke });
}
function _getJoke(jokeId){
	var joke = {};
	jokes.forEach(function(j, i){
		if(j.id === jokeId){
			joke = j;
			return;
		}
	});
    return joke;
}
function _editJoke(jokeId, editedJoke){
	var joke = _getJoke(jokeId);
	if(joke){
		jokes[joke.id] = {id: jokeId, joke: editedJoke};
	}
}
function _deleteJoke(jokeId){
	jokes.splice(jokeId, 1);
}
module.exports = {
	getJokes: _getJokes,
	getJoke: _getJoke,
	getRandomJoke: _getRandomJoke,
	addJoke: _addJoke,
	editJoke: _editJoke,
	deleteJoke: _deleteJoke
}