import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";
import { toast } from "react-toastify";
function timeConverter(UNIX_timestamp) {
  let x = new Date(UNIX_timestamp).toISOString().slice(0, 19).replace("T", " ");
  return x;
}
function validate_form(name, comment) {
  let errors = {
    error_name: "",
    error_comment: "",
  };
  if (name === "") {
    errors.error_name = "Commenter's name cannot be empty";
  }
  if (comment === "") {
    errors.error_comment = "Comment cannot be empty";
  }
  return errors;
}
export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      name: "",
      comment: "",
      time: "",
      errors: {
        error_name: "",
        error_comment: "",
      },
      data: [],
    };
  }
  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const comment = this.state.comment;
    const errors = validate_form(name, comment);
    if (errors.error_comment !== "" || errors.error_name !== "") {
      this.setState({
        errors: {
          error_name: errors.error_name,
          error_comment: errors.error_comment,
        },
      });
      return;
    } else {
      document.getElementById("root").style.filter = "blur(0px) grayscale(0%)";
      this.setState({
        isModalOpen: false,
      });
      fetch("https://itp404-final-project-backend.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          comment: this.state.comment,
          //   time: Math.round(new Date().getTime() / 1000),
          time: new Date().getTime(),
          error_name: "",
          error_comment: "",
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          toast.success(`Your comment was successfully sent`);
          this.props.history.push("/");
          this.props.history.push("/comment");
        });
    }
  };
  componentDidMount() {
    document.title = "Comments";
    fetch("https://itp404-final-project-backend.herokuapp.com/api/comments")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          data: json.sort((a, b) => (a.time < b.time ? 1 : -1)),
        });
      });
  }
  render() {
    return (
      <div className="App">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            this.setState({ isModalOpen: true });
            document.getElementById("root").style.filter = "blur(5px)";
          }}
        >
          Leave Your Comment Here
        </button>

        {this.state.isModalOpen && (
          <Modal
            title="Add a comment to this log system"
            state={this.state}
            onClose={() => {
              document.getElementById("root").style.filter =
                "blur(0px) grayscale(0%)";
              this.setState({
                isModalOpen: false,
                name: "",
                comment: "",
                time: "",
                errors: {
                  error_name: "",
                  error_comment: "",
                },
              });
            }}
            handleSubmit={this.handleSubmit}
            handleNameChange={this.handleNameChange}
            handleCommentChange={this.handleCommentChange}
          />
        )}
        <div className="container mx-auto align-center">
          <hr />
          {this.state.data.map((each) => (
            <div key={each.id} className="container">
              <div className="row comment_name">{each.name}</div>
              <div className="row comment_time" data-testid="comment_time">
                {timeConverter(each.time)}
              </div>
              <br />
              <div className="row comment_content">{each.comment}</div>
              <br />
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
