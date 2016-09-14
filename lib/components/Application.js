import React, { Component } from 'react';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      hint: '',
      guess: '',
      userInputGuess: '',
      lastGuess: '',
      randomNumber: '',
      minValue: 0,
      maxValue: 100,
      level: 1,
    };
    this.storeGuess           = this.storeGuess.bind(this);
    this.guessButtonClick     = this.guessButtonClick.bind(this);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.storeGuess           = this.storeGuess.bind(this);
    this.higherLower          = this.higherLower.bind(this);
    this.resetGame            = this.resetGame.bind(this);
    this.clearFields          = this.clearFields.bind(this);
    this.guessOutsideRange    = this.guessOutsideRange.bind(this);
    this.winGame              = this.winGame.bind(this);
    this.storeMinRange        = this.storeMinRange.bind(this);
    this.storeMaxRange        = this.storeMaxRange.bind(this);
    this.disableRange         = this.disableRange.bind(this);
  }

  generateRandomNumber() {
    const { maxValue, minValue } = this.state;
    var newRandomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    this.setState({
      randomNumber: newRandomNumber
    });
  }

  resetGame() {
    this.generateRandomNumber();
    this.setState({
      hint: '',
      guess: '',
      userInputGuess: '',
      lastGuess: '',
      minValue: 0,
      maxValue: 100,
      level: 1
    });
  }

  clearFields() {
    this.setState({
      hint: '',
      guess: '',
      userInputGuess: '',
      lastGuess: '',
    });
  }

  storeGuess(event) {
    const UserInput = +event.target.value;
    this.setState({ guess: UserInput, userInputGuess: UserInput });
  }

  storeMinRange(event) {
    const MinInput = +event.target.value;
    if(MinInput >= this.state.maxValue) {
      alert('Please Enter a Number higher than the Min Value');
      event.target.value = '';
      return this.setState({ minValue: 0 });
    }
    this.setState({ minValue: MinInput });
    this.generateRandomNumber();
  }

  storeMaxRange(event) {
    const MaxInput = +event.target.value;
    if(MaxInput <= this.state.minValue) {
      return this.setState({ maxValue: 100 });
    }
    this.setState({ maxValue: MaxInput });
    this.generateRandomNumber();
  }

  guessOutsideRange() {
    if (this.state.guess < this.state.minValue || this.state.guess > this.state.maxValue ) {
      alert('please pick a number within the set range');
    }
  }

  disableRange() {

  }

  guessButtonClick() {
    if(isNaN(this.state.guess)) { return alert('Please enter number values only.'); }
    this.guessOutsideRange();
    this.setState({ lastGuess: this.state.guess });
    this.higherLower();
  }


  higherLower() {
    if (this.state.guess < this.state.randomNumber) {
      this.setState({ hint: 'to low, try a higher number'});
    }
    if (this.state.guess > this.state.randomNumber) {
      this.setState({ hint: 'to high, try a lower number'});
    }
    if (this.state.guess === this.state.randomNumber) {
      this.winGame();
    }
  }

  winGame() {
      alert('You Win!');
      this.clearFields();
      this.generateRandomNumber();
      this.setState({
        minValue: this.state.minValue -= 10,
        maxValue: this.state.maxValue += 10,
        level: this.state.level + 1
      });
  }

  componentWillMount() {
    this.generateRandomNumber();
  }

  render() {
    return (
      <section className="NumberGuesser">
        <h1 className="showRandomNumber">Random Number {this.state.randomNumber}
          <br/>High Range: {this.state.maxValue}
          <br/>Low Range: {this.state.minValue}
          <br/>Level: {this.state.level}
        </h1>
        <h2 className="lastGuess">Your last guess was {this.state.lastGuess}</h2>
        <h1 className="Guess"></h1>
        <h2 className="HighLow">{this.state.hint}</h2>
        <input
          className="UserInput"
          value={this.state.userInputGuess}
          onChange={this.storeGuess}
          type="number"
        />
        <button
          disabled={!this.state.guess}
          className="GuessButton"
          onClick={this.guessButtonClick}
          >
          Guess
        </button>
        <button
          disabled={!this.state.guess}
          className="ClearButton"
          onClick={this.clearFields}
          >
          Clear
        </button>
        <button
          disabled={!this.state.guess}
          className="ResetButton"
          onClick={this.resetGame}
          >
          Reset Game
        </button>
        <h1>Min Input: {this.state.minValue}</h1>
        <input
          className="MinInput"
          onChange={this.storeMinRange}
          type="number"
        />
        <h1>Max Input: {this.state.maxValue}</h1>
        <input
          className="MaxInput"
          onChange={this.storeMaxRange}
          type="number"
        />

      </section>
    )
  }
}
