import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Phrase = props => (
  <a href={"/phrases/edit/"+props.phrase._id}
    className="list-group-item list-group-item-action flex-column align-items-start">
      <p className="mb-1">
      {
        props.phrase.words.map((word, index) =>{
          if (index !== props.phrase.wildcard_pos) {
            return <span>{word} </span>
          } else {
            return <span className="text-info">{word} </span>
          }
        })
      }
      </p>
  </a>
)

export default class PhrasesList extends Component {
  constructor(props) {
    super(props);
    this.deletePhrase = this.deletePhrase.bind(this);
    this.state = { phrases: [] }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/phrases/')
      .then(res => { this.setState({ phrases: res.data })})
      .catch(err => { console.log('Error: ' + err)})
  }

  deletePhrase(id) {
    axios.delete('http://localhost:5000/phrases/' + id)
      .then(res => console.log(res.data));
    
    this.setState({
      phrases: this.state.phrases.filter(el => el._id !== id)
    })
  }

  listPhrases() {
    return this.state.phrases.map(phrase => {
      return <Phrase phrase={phrase} deletePhrase={this.deletePhrase} key={phrase._id}/>
    })
  }

  render() {
    return (
      <div>
        <h5>Phrase List</h5>
        <Link className="btn btn-primary" to="/phrases/add">Add Phrase</Link>
        <div className="list-group">
            { this.listPhrases() }
        </div>
      </div>
    )
  }
}