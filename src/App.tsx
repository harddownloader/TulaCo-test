import "./App.css";
import Game from "./components/Game";
import Settings from "./components/Settings";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>
        <Link to="/settings">
          <button>Settings</button>
        </Link>

        <Switch>
          <Route exact path="/">
            <Game />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
