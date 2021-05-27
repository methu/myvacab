import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RandomPhrase extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      phrases: [],
      words: [],
      phrase: {words:[]},
      word: {title: ""},
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/phrases/')
      .then(res => { this.setState({ phrases: res.data })})
      .catch(err => { console.log('Error: ' + err)});

    axios.get('http://localhost:5000/words/')
      .then(res => { this.setState({ words: res.data })})
      .catch(err => { console.log('Error: ' + err)})
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.phrases.length === 0 || this.state.words.length === 0) {
      return
    }
    const random_phrase = this.state.phrases.sort(() => Math.random() - 0.5)[0];
    const random_word = this.state.words
      .filter(el => el.wclass === random_phrase.wildcard_class)
      .sort(() => Math.random() - 0.5)[0];

    this.setState({
      phrase: random_phrase,
      word: random_word
    });
  }

  render() {
    return (
      <div>
        <h5>Random Phrase</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <blockquote>
            {
              this.state.phrase.words.map((word, index) => {
                if (index !== this.state.phrase.wildcard_pos) {
                  return <span>{word} </span>
                } else {
                  return <span><Link to={"/words/view/"+this.state.word._id}>{this.state.word.title}</Link> </span>
                }
              })
            }
            </blockquote>
          </div>

          <div className="form-group">
            <input type="submit" value="Get Random Phrase" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}