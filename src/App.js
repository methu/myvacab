import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from "./components/navbar.component";
import RandomPhrase from "./components/random-phrase.component";
import PhrasesList from "./components/phrases-list.component";
import NewPhrase from "./components/add-phrase.component";
import WordsList from "./components/words-list.component";
import NewWord from "./components/add-word.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={RandomPhrase} />
        <Route path="/phrases" exact component={PhrasesList} />
        <Route path="/phrases/add" component={NewPhrase} />
        <Route path="/words" exact component={WordsList} />
        <Route path="/words/add" component={NewWord} />
      </div>
    </Router>
  );
}

export default App;
