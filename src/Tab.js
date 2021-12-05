import "./style.css";
import React from "react";
import PropTypes from "prop-types";
export default class Tab extends React.Component {
  render() {
    return this.props.content ? (
      <>
        <div className="tab mb-2">
          <span className="title text-center">
            <button
              onClick={() => {
                this.props.handleclick();
              }}
              className={
                this.props.active ? "btn btn-secondary" : "btn btn-primary"
              }
            >
              {this.props.active
                ? this.props.buttonText[1]
                  ? this.props.buttonText[1]
                  : "-"
                : this.props.buttonText[0]
                ? this.props.buttonText[0]
                : "+"}
            </button>
          </span>
        </div>
        <div className={this.props.active ? "content show" : "content hide"}>
          {this.props.content}
        </div>
      </>
    ) : (
      <></>
    );
  }
}
Tab.propTypes = {
  handleclick: PropTypes.func,
  buttonText: PropTypes.array,
  content: PropTypes.string,
  active: PropTypes.bool,
};
