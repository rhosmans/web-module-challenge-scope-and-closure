// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 *
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 *
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 *
 * 1. What is the difference between counter1 and counter2?
 *     counter1 contains variables in function scope, counter2 mutates a global variable.
 * 2. Which of the two uses a closure? How can you tell?
 *     Both use closure as they both access variabes outside of their scope, but counter1 uses closure in a more
 *     meaningful way, as it keeps track of a variable defined in a function scope (not global).
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *      counter1 seems preferable in almost all instances as it's better practice not to use global variables.
 *      counter2 might work better in some instances where a global variable is needed.
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning()

Write a function called `inning` that returns a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(){
  return Math.round(Math.random() * 2);
}
//console.log("Inning: ", inning());


/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example,

finalScore(inning, 9) might return:
{
  "Home": 11,
  "Away": 5,
}

*/

function finalScore(cb){
  return {"Home": cb(), "Away": cb()};
}

//console.log("Final Score: ", finalScore(inning));

/* Task 4:

Create a function called `scoreboard` that accepts the following parameters:

(1) Callback function `getInningScore`
(2) Callback function `inning`
(3) A number of innings

and returns the score at each pont in the game, like so:
1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam
Final Score: awayTeam - homeTeam */


function scoreboard(innings, cb) {
  let home = 0;
  let away = 0;
  const game = [];
  for(let i = 0; i < innings; i++) {
    home += cb();
    away += cb();
    game.push(`Inning ${i + 1}: Home: ${home}, Away ${away}`);
  }
  return game;
}

console.log(scoreboard(9, inning));

function newScoreboard(innings, cbFinalScore, cbInning) {
  const game = [];
  for(let i = 0; i < innings; i++) {
    const currentInning = cbFinalScore(cbInning);
    currentInning["Inning"] = i + 1;
    if(i !== 0) {
      currentInning.Home = (cbInning() + game[i - 1].Home);
      currentInning.Away = (cbInning() + game[i - 1].Away);
    }
    game.push(currentInning);
  }
  return game;
}

console.log(newScoreboard(9, finalScore, inning));
