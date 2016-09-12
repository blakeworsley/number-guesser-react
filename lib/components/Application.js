import React, { Component } from 'react';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      guess: '',
      lastGuess: '',
      randomNumber: '',
      maxValue: 100,
      minValue: 0,
      hint: '',
    };
    this.guessButtonClick = this.guessButtonClick.bind(this);
    this.storeGuess = this.storeGuess.bind(this);
    this.higherLower = this.higherLower.bind(this);
  }

  generateRandomNumber() {
    const { maxValue, minValue } = this.state;
    var newRandomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    this.setState({
      randomNumber: newRandomNumber
    });
  }

  storeGuess(event) {
    const UserInput = +event.target.value;
    this.setState({ guess: UserInput });
  }

  guessButtonClick() {
    console.log(this.state.guess);
    console.log(this.state.randomNumber);
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
      this.setState({ hint: 'You Win!'});
    }
  }

  componentWillMount() {
    this.generateRandomNumber();
  }

  render() {
    return (
      <section className="NumberGuesser">
        <h1 className="showRandomNumber">{this.state.randomNumber}</h1>
        <h2 className="lastGuess">Your last guess was {this.state.lastGuess}</h2>
        <h1 className="Guess"></h1>
        <h2 className="HighLow">{this.state.hint}</h2>
        <input
          className="UserInput"
          onKeyUp={this.storeGuess}
        />
        <button
          className="GuessButton"
          onClick={this.guessButtonClick}
          >Guess
        </button>
        <button className="ClearButton">Clear</button>
        <button className="ResetButton">Reset Game</button>
      </section>
    )
  }
}
