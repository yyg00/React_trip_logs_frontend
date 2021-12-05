import React from "react";
import "./style.css";
import EditLog from "./Log";
import NotFound from "./NotFound";
import ContinentLogs from "./ContinentLogs";
import Continents from "./Continents";
import Navigation from "./Navigation";
import CreateLogForm from "./CreateLogForm";
import Logs from "./Logs";
import Comment from "./Comment";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path="/comment" component={Comment} />
            <Route exact path="/newLog" component={CreateLogForm} />
            <Route
              path="/logs/continents/:continentId"
              component={ContinentLogs}
            />
            <Route path="/logs/:logId" component={EditLog} />
            <Route exact path="/logs" component={Logs} />

            <Route exact path="/">
              <Continents />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}
