import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Accordion from "./Accordion";
export default class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      continents: [],
    };
  }

  componentDidMount() {
    document.title = "All logs";
    fetch("https://itp404-final-project-backend.herokuapp.com/api/logs")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          data: json,
        });
      });
    fetch("https://itp404-final-project-backend.herokuapp.com/api/continents")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          continents: [...json.map((each) => each.name)],
        });
      });
  }
  render() {
    return this.state.data.length !== 0 ? (
      <div className="container-fluid">
        <table className="table table-striped">
          <thead>
            <tr className="row">
              <th className="col-3">Continent</th>
              <th className="col-3">Country</th>
              <th className="col-3">Trip Year</th>
              <th className="col-3">Log</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((each) => (
              <tr key={each.id} className="row">
                <td className="col-3">
                  {this.state.continents[each.continentId]}
                </td>
                <td className="col-3">{each.country}</td>
                <td className="col-3">{each.year}</td>
                <td className="col-3">
                  {" "}
                  <Link to={`/logs/${each.id}`}>{each.title}</Link>
                  <Accordion tabs={each} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>No records found.</div>
    );
  }
}
