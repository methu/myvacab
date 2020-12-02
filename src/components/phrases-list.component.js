import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Phrase = props => (
  <a href={"/phrases/view/"+props.phrase._id}
    className="list-group-item list-group-item-action flex-column align-items-start">
      {props.phrase.words.join(' ')}
  </a>
)

export default class PhrasesList extends Component {
  constructor(props) {
    super(props);
    this.deletePhrase = this.deletePhrase.bind(this);
    this.state = { phrases: [] }
  }

  componentDidMount() {
    axios.get('http://192.168.10.102:5000/phrases/')
      .then(res => { this.setState({ phrases: res.data })})
      .catch(err => { console.log('Error: ' + err)})
  }

  deletePhrase(id) {
    axios.delete('http://192.168.10.102:5000/phrases/' + id)
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