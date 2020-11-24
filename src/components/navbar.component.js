import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">My Vocab</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/phrases" className="nav-link">Phrases</Link>
            </li>
            <li className="navbar-item">
              <Link to="/words" className="nav-link">Words</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}