import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ViewWord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      wclass: "",
      quote: "",
    }
  }

  componentDidMount() {
    axios.get('http://192.168.10.102:5000/words/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          wclass: res.data.wclass,
          quote: res.data.quote,
        });
      })
      .catch(err => console.log('Error: ' + err));
  }

  render() {
    return(
      <div>
        <h5>Edit Word</h5>
          <div>
            <h6>Title:</h6>
            <p>{this.state.title}</p>
          </div>
          <div>
            <h6>Class:</h6>
            <p>{this.state.wclass}</p>
          </div>
          <div>
            <h6>Quote:</h6>
            <p>{this.state.quote}</p>
          </div>
          <div>
            <Link className="btn btn-primary" to={"/words/edit/"+this.props.match.params.id}>Edit</Link>
            <Link className="btn" to="/words/">Go Back</Link>
          </div>
      </div>
    )
  }
}