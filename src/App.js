import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import RandomPhrase from "./components/random-phrase.component";
import PhrasesList from "./components/phrases-list.component";
import NewPhrase from "./components/add-phrase.component";
import EditPhrase from "./components/edit-phrase.component";
import WordsList from "./components/words-list.component";
import NewWord from "./components/add-word.component";
import EditWord from "./components/edit-word.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">My Vocab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/phrases">Phrases</Nav.Link>
              <Nav.Link href="/words">Words</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route path="/" exact component={RandomPhrase} />
        <Route path="/phrases" exact component={PhrasesList} />
        <Route path="/phrases/add" excat component={NewPhrase} />
        <Route path="/phrases/edit/:id" exact component={EditPhrase} />
        <Route path="/words" exact component={WordsList} />
        <Route path="/words/add" exact component={NewWord} />
        <Route path="/words/edit/:id" exact component={EditWord} />
      </div>
    </Router>
  );
}

export default App;
