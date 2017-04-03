import React from "react";
import ReactDOM from "react-dom";
import Board from "./scoreboard.js";
import Screen from "./bigscreen.js";
import "./scoreboard.scss";

if (document.body.classList.contains("bigscreen")) {
  ReactDOM.render(<Screen />, document.getElementById("scoreboard"));
} else {
  ReactDOM.render(<Board />, document.getElementById("scoreboard"));
}
