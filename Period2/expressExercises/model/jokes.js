var jokes = [
 "A day without sunshine is like, night.",
 "At what age is it appropriate to tell my dog that he's adopted?",
 "I intend to live forever, or die trying"
];

module.exports = {
 allJokes : jokes,
 getRandomJoke : _getRandomJoke,
 addJoke : _addJoke
};

function _getRandomJoke(){
	var randomNumber = 0;
	randomNumber = getRandomInt(0, jokes.length);
	console.log(randomNumber);
	return jokes[randomNumber];
}

function _addJoke(newJoke){
	jokes.push(newJoke);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}