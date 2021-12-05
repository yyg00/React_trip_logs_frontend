import React from "react";
import ReactDom from "react-dom";
import "./style.css";

export default class Modal extends React.Component {
  render() {
    const modalContainer = document.getElementById("modal-container");
    return ReactDom.createPortal(
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.props.onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(event) => {
                  this.props.handleSubmit(event);
                }}
              >
                <label className="text-sm-right form-label" htmlFor="name">
                  Commenter's name
                </label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  onChange={(event) => {
                    this.props.handleNameChange(event);
                  }}
                />
                <span style={{ color: "red" }}>
                  {this.props.state.errors.error_name}
                </span>
                <div>
                  <label className="text-sm-right form-label" htmlFor="comment">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    className="form-control"
                    onChange={(event) => {
                      this.props.handleCommentChange(event);
                    }}
                  />
                  <span style={{ color: "red" }}>
                    {this.props.state.errors.error_comment}
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(event) => {
                  this.props.handleSubmit(event);
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,

      modalContainer
    );
  }
}
