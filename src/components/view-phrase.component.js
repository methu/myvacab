import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ViewPhrase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      words: [],
      wildcard_pos: 0,
      wildcard_class: ""
    }
  }

  componentDidMount() {
    axios.get('http://192.168.10.102:5000/phrases/'+this.props.match.params.id)
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

  render() {
    return(
      <div>
        <h5>View Phrase</h5>
          <div>
            <h6>Phrase:</h6>
            <p>{this.state.text}</p>
          </div>
          <div>
            <h6>Wildcard:</h6>
            <p>{this.state.words[this.state.wildcard_pos]}</p>
          </div>
          <div>
            <h6>Wildcard Class:</h6>
            <p>{this.state.wildcard_class}</p>
          </div>
          <div>
            <Link to="/phrases/">Go Back</Link>
          </div>
      </div>
    )
  }
}