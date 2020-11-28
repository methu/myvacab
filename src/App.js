import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from "./components/navbar.component";
import RandomPhrase from "./components/random-phrase.component";
import PhrasesList from "./components/phrases-list.component";
import EditPhrase from "./components/edit-phrase.component";
import WordsList from "./components/words-list.component";
import EditWord from "./components/edit-word.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={RandomPhrase} />
        <Route path="/phrases" exact component={PhrasesList} />
        <Route path="/phrase/:id" component={EditPhrase} />
        <Route path="/phrases/add" component={EditPhrase} />
        <Route path="/words" exact component={WordsList} />
        <Route path="/word/:id" component={EditWord} />
        <Route path="/words/add" component={EditWord} />
      </div>
    </Router>
  );
}

export default App;
