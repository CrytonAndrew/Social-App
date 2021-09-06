import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./screens/home/Home";
import Profile from "./screens/Profile/Profile"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
    
  );
}

export default App;
