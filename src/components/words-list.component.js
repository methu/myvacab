import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Word = props => (
  <tr>
    <td>{props.word.title}</td>
    <td>{props.word.wclass}</td>
    <td>{props.word.quote}</td>
    <td>
      <Link to={"/words/edit/"+props.word._id}>edit</Link>
    </td>
  </tr>
)

export default class WordsList extends Component {
  constructor(props) {
    super(props);
    this.deleteWord = this.deleteWord.bind(this);
    this.state = { words: [] }
  }

  componentDidMount() {
    axios.get('http://192.168.10.102:5000/words/')
      .then(res => { this.setState({ words: res.data })})
      .catch(err => { console.log('Error: ' + err)})
  }

  deleteWord(id) {
    axios.delete('http://192.168.10.102:5000/words/' + id)
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Class</th>
              <th>Quote</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.listWords() }
          </tbody>
        </table>
        <Link className="btn btn-primary" to="/words/add">Add Word</Link>
      </div>
    )
  }
}