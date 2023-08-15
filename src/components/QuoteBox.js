import React, { Component } from "react";
import axios from "axios";

class QuoteBox extends Component {
  state = {
    displayedAuthor: "",
    quoteFull: "",
    quote: "",
    author: "",
    showAuthor: false,
  };

  componentDidMount() {
    this.fetchQuote();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.quoteFull !== prevState.quoteFull) {
      this.typeQuote();
    }
  }

  fetchQuote = () => {
    axios.get("https://api.quotable.io/random").then((res) => {
      const data = res.data;
      this.setState({
        quoteFull: data.content,
        author: data.author,
        quote: "",
        showAuthor: false,
      });
    });
  };

  typeQuote = () => {
    const fullQuote = this.state.quoteFull;
    const fullAuthor = "- " + this.state.author; // Ajout d'un tiret pour le style
    let quoteIndex = 0;
    let authorIndex = 0;

    // Calculez le délai avant de commencer à taper l'auteur pour qu'ils se terminent en même temps
    const authorDelay = (fullQuote.length - fullAuthor.length) * 50;

    const typing = setInterval(() => {
      if (quoteIndex < fullQuote.length) {
        this.setState((prevState) => ({
          quote: fullQuote.slice(0, quoteIndex + 1),
        }));
        quoteIndex++;
      }

      // Commencez à taper l'auteur après le délai calculé
      if (quoteIndex * 50 > authorDelay) {
        this.setState((prevState) => ({
          displayedAuthor: fullAuthor.slice(0, authorIndex + 1),
        }));
        authorIndex++;
      }

      // Si les deux (citation et auteur) sont complètement tapés, arrêtez l'intervalle
      if (
        quoteIndex === fullQuote.length &&
        authorIndex === fullAuthor.length
      ) {
        clearInterval(typing);
        this.setState({ showAuthor: true }); // Affichez l'auteur avec l'effet de fondu
      }
    }, 50);
  };

  tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}`;
    window.open(twitterUrl, "_blank");
  };

  render() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${this.state.quote} ${this.state.author}`;

    return (
      <div id="quote-box">
        <div id="text">{this.state.quote}</div>
        <div id="author" style={{ opacity: this.state.showAuthor ? 1 : 0 }}>
          {this.state.displayedAuthor}
        </div>
        <button id="new-quote" onClick={this.fetchQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            this.tweetQuote();
          }}
        >
          Tweet Quote
        </a>
      </div>
    );
  }
}

export default QuoteBox;
