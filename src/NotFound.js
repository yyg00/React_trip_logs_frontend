import React from "react";

export default class NotFound extends React.Component {
  componentDidMount() {
    document.title = "404 Not Found";
  }
  render() {
    return <h1 data-testid="not_found">404 Not Found</h1>;
  }
}
