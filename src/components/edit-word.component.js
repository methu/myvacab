import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditWord extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeWClass = this.onChangeWClass.bind(this);
    this.onChangeQuote = this.onChangeQuote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      wclass: "",
      quote: "",
      edit_mode: false
    }
  }

  componentDidMount() {
    // TODO:
    // check if id exists in the parameters
    // if so change edit_mode to true and edit existing word
    // else create new word
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeWClass(e) {
    this.setState({
      wclass: e.target.value
    })
  }

  onChangeQuote(e) {
    this.setState({
      quote: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const word = {
      title: this.state.title,
      wclass: this.state.wclass,
      quote: this.state.quote,
    }

    axios.post('http://localhost:5000/words/add', word)
      .then(res => console.log(res.data));

    this.setState({
      title: "",
      wclass: "",
      quote: "",
    })
  }

  render() {
    return(
      <div>
        <h3>Add New Word</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Class:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.wclass}
              onChange={this.onChangeWClass}
            />
          </div>
          <div className="form-group">
            <label>Quote:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.quote}
              onChange={this.onChangeQuote}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}