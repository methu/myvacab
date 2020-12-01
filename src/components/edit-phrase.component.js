import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditPhrase extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeWildcardPos = this.onChangeWildcardPos.bind(this);
    this.onChangeWildcardClass = this.onChangeWildcardClass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      text: "",
      words: [],
      wildcard_pos: 0,
      wildcard_class: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/phrases/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          text: res.data.words.join(' '),
          words: res.data.words,
          wildcard_pos: res.data.wildcard_pos,
          wildcard_class: res.data.wildcard_class
        })
      })
      .catch(err => console.log('Error: ' + err));
  }

  onChangeText(e) {
    const textValue = e.target.value;
    this.setState({
      text: textValue,
      words: textValue.split(' '),
      wildcard_pos: 0,
      wildcard_class: ''
    })
  }

  onChangeWildcardPos(e) {
    this.setState({
      wildcard_pos: e.target.value
    })
  }

  onChangeWildcardClass(e) {
    this.setState({
      wildcard_class: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const phrase = {
      words: this.state.words,
      wildcard_pos: this.state.wildcard_pos,
      wildcard_class: this.state.wildcard_class
    }

    axios.put('http://localhost:5000/phrases/'+this.props.match.params.id, phrase)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return(
      <div>
        <h3>Edit Phrase</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Phrase:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.text}
              onChange={this.onChangeText}
            />
          </div>
          <div className="form-group">
            <label>Wildcard:</label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.wildcard_pos}
              onChange={this.onChangeWildcardPos}>
              {
                this.state.words.map((word, index) => {
                  return <option
                    key={index}
                    value={index}>{word}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Wildcard Class:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.wildcard_class}
              onChange={this.onChangeWildcardClass}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary" />
            <Link className="btn" to="/phrases/">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}