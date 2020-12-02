import { Component } from 'react';
import axios from 'axios';

export default class RandomPhrase extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      phrases: [],
      words: [],
      text: ""
    }
  }

  componentDidMount() {
    axios.get('http://192.168.10.102:5000/phrases/')
      .then(res => { this.setState({ phrases: res.data })})
      .catch(err => { console.log('Error: ' + err)});

    axios.get('http://192.168.10.102:5000/words/')
      .then(res => { this.setState({ words: res.data })})
      .catch(err => { console.log('Error: ' + err)})
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.phrases.length === 0 || this.state.words.length === 0) {
      return
    }
    const phrase = this.state.phrases.sort(() => Math.random() - 0.5)[0];
    const word = this.state.words
      .filter(el => el.wclass === phrase.wildcard_class)
      .sort(() => Math.random() - 0.5)[0];
    phrase.words[phrase.wildcard_pos] = word.title;
    this.setState({
      text: phrase.words.join(' ')
    })
  }

  render() {
    return (
      <div>
        <h5>Random Phrase</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <blockquote>{this.state.text}</blockquote>
          </div>

          <div className="form-group">
            <input type="submit" value="Get Random Phrase" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}