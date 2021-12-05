import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Accordion from "./Accordion";
export default class ContinentLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      continents: [],
    };
  }

  componentDidMount() {
    const cid = this.props.match.params.continentId;
    fetch("https://itp404-final-project-backend.herokuapp.com/api/continents")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          continents: [...json.map((each) => each.name)],
        });
        document.title = `Logs for ${this.state.continents[cid]}`;
      });
    fetch(`https://itp404-final-project-backend.herokuapp.com/api/logs`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].continentId === cid) {
            this.setState({
              data: [...this.state.data, json[i]],
            });
          }
        }
      });
  }
  render() {
    return this.state.data.length === 0 ? (
      <div>No records found.</div>
    ) : (
      <div className="container-fluid">
        <table className="table table-striped">
          <thead>
            <tr className="row">
              <th className="col">Country</th>
              <th className="col">Trip Year</th>
              <th className="col">Log</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((each) => (
              <tr key={each.id} className="row">
                <td className="col">{each.country}</td>
                <td className="col">{each.year}</td>
                <td className="col">
                  {" "}
                  <Link to={`/logs/${each.id}`}>{each.title}</Link>
                  <Accordion tabs={each} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
