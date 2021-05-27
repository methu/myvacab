import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Word = props => (
  <a href={"/words/edit/"+props.word._id}
    className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex justify-content-between">
      <h5 className="mb-1">{props.word.title}</h5>
      <small>{props.word.wclass}</small>
    </div>
    <p className="mb-1">{props.word.quote}</p>
  </a>
)

export default class WordsList extends Component {
  constructor(props) {
    super(props);
    this.deleteWord = this.deleteWord.bind(this);
    this.state = { words: [] }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/words/')
      .then(res => { this.setState({ words: res.data })})
      .catch(err => { console.log('Error: ' + err)})
  }

  deleteWord(id) {
    axios.delete('http://localhost:5000/words/' + id)
      .then(res => console.log(res.data));
    
    this.setState({
      words: this.state.words.filter(el => el._id !== id)
    })
  }

  listWords() {
    return this.state.words.map(word => {
      return <Word word={word} deleteWord={this.deleteWord} key={word._id}/>
    })
  }

  render() {
    return (
      <div>
        <h5>Word List</h5>
        <Link className="btn btn-primary" to="/words/add">Add Word</Link>
        <div className="list-group">
            { this.listWords() }
        </div>
      </div>
    )
  }
}