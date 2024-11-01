import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  // store value of input
  const [value, setValue] = useState("");
  // number of guesses
  const [guesses, setGuesses] = useState(10);
  // game state
  const [isAlive, setIsAlive] = useState(true);
  // win state
  const [hasWon, setHasWon] = useState(false);

  // Add additional states below as required.

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    checkWord(wordDisplay);
    return wordDisplay.toString();
  };

  // create additional function to power the
  
  // check for amount of guesses
  const checkGuesses = () => {
    if(guesses <= 0 || guesses > 10)
    {
      setIsAlive(false);
    };
  };

  // check for winning condition
  const checkWord = (letters) => {
    let word = "";
    for (let letter of letters)
    {
      word += letter;
    }
    if(word == currWord)
    {
      setHasWon(true);
      setIsAlive(false);
    }
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {isAlive && generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        <h3>Input</h3>
        {/* Insert form element here */}
        <form className="input">
          <label>
            Input Letter : 
            <input 
              type="text" 
              maxLength={1} 
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
            </input>
          </label>
          <button 
            onClick={(e) => {
              // Guess
              if(isAlive)
              {
                setGuessedLetters([...guessedLetters, value]);
                setValue("");
                e.preventDefault();
                setGuesses(guesses - 1);
              }
              // Reset
              else
              {
                setCurrentWord(getRandomWord());
                setGuesses(10);
                setGuessedLetters([]);
                setIsAlive(true);
                setHasWon(false);
              }
            }}
          >
            {isAlive ? "Guess!" : "Restart"}
          </button>
        </form>
        {isAlive && checkGuesses()}
        {isAlive && <p>Guesses: {guesses}</p>}
        {/* Display the win or loss message */}
        {!isAlive && !hasWon && <p>You have lost!</p>}
        {hasWon && <p>You have won!</p>}
        {!isAlive && <p>Word: {currWord}</p>}
      </div>
    </>
  );
}

export default App;
