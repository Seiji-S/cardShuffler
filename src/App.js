import React, { Component } from "react";
import { Button } from "reactstrap";

class App extends Component {
  //initial starting deck (unshuffled)
  //My linter formats the array in this way so sorry if this is hard to look at.
  state = {
    deck: [
      "A♠",
      "2♠",
      "3♠",
      "4♠",
      "5♠",
      "6♠",
      "7♠",
      "8♠",
      "9♠",
      "10♠",
      "J♠",
      "Q♠",
      "K♠",
      "A♥",
      "2♥",
      "3♥",
      "4♥",
      "5♥",
      "6♥",
      "7♥",
      "8♥",
      "9♥",
      "10♥",
      "J♥",
      "Q♥",
      "K♥",
      "A♦",
      "2♦",
      "3♦",
      "4♦",
      "5♦",
      "6♦",
      "7♦",
      "8♦",
      "9♦",
      "10♦",
      "J♦",
      "Q♦",
      "K♦",
      "A♣",
      "2♣",
      "3♣",
      "4♣",
      "5♣",
      "6♣",
      "7♣",
      "8♣",
      "9♣",
      "10♣",
      "J♣",
      "Q♣",
      "K♣"
    ],
    discard: [],
    currentCard: ""
  };
  //function to randomize / shuffle the starting deck
  //this is only here to prevent the hassle of having to shuffle the deck multiple times at the start
  shuffleArray(array) {
    let holder = [...array];
    for (let i = holder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [holder[i], holder[j]] = [holder[j], holder[i]];
    }
    this.setState({ deck: holder });
  }

  //function to imitate hand shuffling
  handShuffle(array) {
    //splits deck in half
    let array2 = [];
    array2 = array.splice(0, 25);
    let array3 = [];
    //interleaves cards
    for (let i = 0; i < array.length; i++) {
      array3.push(array[i], array2[i]);
    }
    //set back to original deck
    this.setState({ deck: array3 });
  }

  //function to imitate splitting the deck and stacking the bottom half on top
  splitDeck(array) {
    let halfDeck = [];
    halfDeck = array.splice(0, 25);
    let postSplit = array.concat(halfDeck);
    this.setState({deck: postSplit})
  }

  //picks the top card from the deck
  //reshuffles deck when empty

  pickACard(d1, d2) {
    let first = [...d1];
    let second = [...d2];
    if (first.length === 0) {
      this.setState({ currentCard: "The Deck is Empty Reshuffling" });
      this.setState({ deck: d2 });
      this.setState({ discard: [] });
    } else {
      this.setState({ currentCard: first[0] });
      second.push(first[0]);
      first.splice(0, 1);
      this.setState({ deck: first });
      this.setState({ discard: second });
    }
  }
  //shuffles the deck when first loaded
  componentDidMount() {
    this.shuffleArray(this.state.deck);
  }

  render() {
    return (
      <div class="d-flex justify-content-center">
        <Button
          color="primary"
          size="large"
          onClick={() => this.handShuffle(this.state.deck)}
        >
          {"Shuffle Deck"}
        </Button>
        <Button
          color="success"
          size="large"
          onClick={() => this.pickACard(this.state.deck, this.state.discard)}
        >
          {"Pick a Card"}
        </Button>
        <h1> Your Card : {this.state.currentCard}</h1>
      </div>
    );
  }
}

export default App;
