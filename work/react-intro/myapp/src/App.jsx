import { useState } from 'react';
import Compare from './Compare';
import './App.css';
function App (){
  const [guessed,inGuessing] = useState('');
  const [savedWord, setSaved] = useState('');
  const secretWord = 'recat';
  return (
    <div className="App">
      <p className = "App-Header">Please Guess a 5 letter word</p>
      <div className="App-Result">
      <p>Last word you guess was {savedWord}</p>
      <p>{
        savedWord.length!=5 
          ? <p className="App-Result-Warning">{savedWord} was not a valid word</p>
          : <Compare 
          word = {secretWord} 
          guess = {savedWord}/>
        }</p>
      </div>
      <div className ="App-Guessing">
        <p>Word you are guessing is {guessed}</p>
      <p>{
        guessed.length!=5 
          ? <p className ="App-Guessing-Hint">Hint: you are guessing a 5 letters word</p>
          : <p></p>
        }</p>
      </div>
      <label >
        <span>Word:</span>
        <input 
          value = {guessed}
          onInput = { (e) => inGuessing(e.target.value)}
        />
        <button
          type = "button"
          onClick = { () => setSaved(guessed)}
        >Guess</button>
        
      </label>

    </div>

  );


}




export default App;
