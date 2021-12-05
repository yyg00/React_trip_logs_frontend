import React from "react";
import { NavLink } from "react-router-dom";
export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="mt-2">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/logs">
              Logs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/newLog">
              Create a log
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/comment">
              Comments
            </NavLink>
          </li>
        </ul>
        <hr />
      </nav>
    );
  }
}
