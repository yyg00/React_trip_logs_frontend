import React from "react";
import Tab from "./Tab";
import "./style.css";

// reference: https://ovpv.me/custom-accordion-reactjs/
export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    const items = props.tabs;
    const showText = props.showText;
    const hideText = props.hideText;
    this.state = {
      tabs: items,
      active: false,
      buttonText: [showText, hideText],
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  handleTabClick() {
    if (this.state.active === false) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }
  render() {
    const tabs = this.state.tabs;
    return (
      <div id="accordion">
        <Tab
          handleclick={this.handleTabClick}
          content={tabs.body}
          active={this.state.active}
          buttonText={this.state.buttonText}
        />
      </div>
    );
  }
}
