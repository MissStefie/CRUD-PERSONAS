import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleTable from "./CollapsibleTable";

export default class MainMenu extends Component {
  render() {
    return (
      <div>
        <CollapsibleTable></CollapsibleTable>
      </div>
    );
  }
}
