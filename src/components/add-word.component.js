import { Component } from 'react';
import axios from 'axios';

export default class AddWord extends Component {
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
    }
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

    axios.post('http://192.168.10.102:5000/words/add', word)
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
        <h5>Add New Word</h5>
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