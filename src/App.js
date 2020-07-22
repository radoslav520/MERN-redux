import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <div className="page-wrap">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/:date" exact component={LandingPage} />

          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
