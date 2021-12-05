import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import continentspic from "./assets/continents.png";
import Accordion from "./Accordion";
export default class Continents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    document.title = "Home page";
    fetch("https://itp404-final-project-backend.herokuapp.com/api/continents")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          data: json,
        });
      });
  }
  render() {
    return (
      <div className="text-center">
        <Link to={`/logs`}>
          <img src={continentspic} alt="all" />
        </Link>
        {this.state.data.map((each) => (
          <div key={each.id}>
            {" "}
            <Link to={`/logs/continents/${each.id}`} data-testid={each.name}>
              {each.name}
            </Link>
            <div className="mb-3" data-testid="accordion">
              <Accordion tabs={each} showText={"Show more"} hideText={"Hide"} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
