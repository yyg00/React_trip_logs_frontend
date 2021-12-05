import React from "react";
import { toast } from "react-toastify";
import "./style.css";
export default class EditLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      year: "",
      body: "",
      continentId: "",
      country: "",
      error: "",
    };
  }
  deletePost() {
    const isConfirmed = window.confirm("Are you sure to delete this log?");
    if (!isConfirmed) {
      return;
    }
    const id = this.props.match.params.logId;
    fetch(`https://itp404-final-project-backend.herokuapp.com/api/logs/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success(`Successfully deleted`);
      this.props.history.push("/");
      this.props.history.push("/logs");
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
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.title === "") {
      this.setState({ error: "Title cannot be empty" });
      return;
    }
    const id = this.props.match.params.logId;
    fetch(`https://itp404-final-project-backend.herokuapp.com/api/logs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        year: this.state.year,
        body: this.state.body,
        continentId: this.state.continentId,
        country: this.state.country,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        toast.success(`Log "${json.title}" was successfully updated`);
        this.props.history.push("/");
        this.props.history.push("/logs");
      });
  }
  componentDidMount() {
    const id = this.props.match.params.logId;
    fetch(`https://itp404-final-project-backend.herokuapp.com/api/logs/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState(json);
        document.title = `Log "${this.state.title}"`;
      });
  }

  render() {
    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
      >
        <div className="my-3 form-group required">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            className="form-control"
            value={this.state.title}
            onChange={(event) => {
              this.handleTitleChange(event);
            }}
          />
          <span style={{ color: "red" }}>{this.state.error}</span>
        </div>
        <div className="my-3">
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
          />
        </div>
        <button type="submit" className="btn btn-primary edit">
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            this.deletePost();
          }}
        >
          Delete
        </button>
      </form>
    );
  }
}
