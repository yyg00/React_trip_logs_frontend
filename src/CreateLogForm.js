import React from "react";
import { toast } from "react-toastify";
import "./style.css";
function validate_form(continentId, country, year, title) {
  let errors = {
    error_continent: "",
    error_country: "",
    error_year: "",
    error_title: "",
  };
  if (continentId === "") {
    errors.error_continent = "Continent cannot be empty";
  }
  if (country === "") {
    errors.error_country = "Country cannot be empty";
  }
  if (title === "") {
    errors.error_title = "Title cannot be empty";
  }
  if (year === "") {
    errors.error_year = "Year cannot be empty";
  } else if (
    isNaN(parseInt(year)) ||
    parseInt(year) < 1980 ||
    parseInt(year) > 2021
  ) {
    errors.error_year = "Year should be in range 1980-2021";
  }
  return errors;
}
export default class CreateLogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      continentId: "",
      country: "",
      year: "",
      title: "",
      body: "",
      continents: [],
      id: "",
      errors: {
        error_continent: "",
        error_country: "",
        error_year: "",
        error_title: "",
      },
    };
  }
  componentDidMount() {
    document.title = "Create a new log";
    fetch("https://itp404-final-project-backend.herokuapp.com/api/continents")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          continents: json,
        });
      });
    fetch("https://itp404-final-project-backend.herokuapp.com/api/logs")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          id: String(
            json.length !== 0
              ? Math.max(...json.map((each) => parseInt(each.id))) + 1
              : 0
          ),
        });
      });
  }
  handleCountryChange(event) {
    this.setState({
      country: event.target.value,
    });
  }
  handleYearChange(event) {
    this.setState({
      year: event.target.value,
    });
  }
  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }
  handleBodyChange(event) {
    this.setState({
      body: event.target.value,
    });
  }
  handleContinentChange(event) {
    this.setState({
      continentId: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const continentId = this.state.continentId;
    const country = this.state.country;
    const year = this.state.year;
    const title = this.state.title;
    let errors = validate_form(continentId, country, year, title);
    if (
      errors.error_continent !== "" ||
      errors.error_country !== "" ||
      errors.error_year !== "" ||
      errors.error_title !== ""
    ) {
      this.setState({
        errors: {
          error_continent: errors.error_continent,
          error_country: errors.error_country,
          error_year: errors.error_year,
          error_title: errors.error_title,
        },
      });
      return;
    } else {
      fetch("https://itp404-final-project-backend.herokuapp.com/api/logs", {
        method: "POST",
        body: JSON.stringify({
          title: this.state.title,
          body: this.state.body,
          id: this.state.id,
          continentId: this.state.continentId,
          year: this.state.year,
          country: this.state.country,
          error_continent: "",
          error_country: "",
          error_year: "",
          error_title: "",
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          toast.success(`"${json.title}" was successfully created`);
          this.props.history.push("/logs");
        });
    }
  }
  render() {
    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
      >
        <div className="my-3 form-group required">
          <label className="text-sm-right form-label col-2" htmlFor="continent">
            Continent
          </label>
          <select
            className="form-select"
            id="continent"
            data-testid="select"
            value={this.state.continentId}
            onChange={(event) => {
              this.handleContinentChange(event);
            }}
          >
            <option>--Select Continent--</option>
            {/* {this.state.continents.map((continent) => (
              <option
                data-testid="select-option"
                key={continent.id}
                value={continent.id}
              >
                {continent.name}
              </option>
            ))} */}
            <option data-testid="select-option" value={"0"}>
              Africa
            </option>
            <option data-testid="select-option" value={"1"}>
              Antractica
            </option>
            <option data-testid="select-option" value={"2"}>
              Asia
            </option>
            <option data-testid="select-option" value={"3"}>
              Australia
            </option>
            <option data-testid="select-option" value={"4"}>
              Europe
            </option>
            <option data-testid="select-option" value={"5"}>
              North America
            </option>
            <option data-testid="select-option" value={"6"}>
              South America
            </option>
          </select>
          <span style={{ color: "red" }}>
            {this.state.errors.error_continent}
          </span>
        </div>
        <div className="my-3 form-group required">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            id="country"
            type="text"
            data-testid="country"
            className="form-control"
            value={this.state.country}
            onChange={(event) => {
              this.handleCountryChange(event);
            }}
          />
          <span style={{ color: "red" }}>
            {this.state.errors.error_country}
          </span>
        </div>
        <div className="my-3 form-group required">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            id="year"
            type="number"
            data-testid="year"
            className="form-control"
            value={this.state.year}
            onChange={(event) => {
              this.handleYearChange(event);
            }}
          />
          <span style={{ color: "red" }}>{this.state.errors.error_year}</span>
        </div>
        <div className="my-3 form-group required">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={this.state.title}
            onChange={(event) => {
              this.handleTitleChange(event);
            }}
          />
          <span style={{ color: "red" }}>{this.state.errors.error_title}</span>
        </div>
        <div className="my-3 form-group">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea
            id="body"
            className="form-control"
            value={this.state.body}
            onChange={(event) => {
              this.handleBodyChange(event);
            }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Create a new log
        </button>
      </form>
    );
  }
}
