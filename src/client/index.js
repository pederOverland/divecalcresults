import React from "react";
import ReactDOM from "react-dom";
import Board from "./scoreboard.js";
import Screen from "./bigscreen.js";
import "./scoreboard.scss";

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const channel = getParameterByName("channel");

if (document.body.classList.contains("bigscreen")) {
  ReactDOM.render(<Screen channel={channel || 'screen'} />, document.getElementById("scoreboard"));
} else {
  ReactDOM.render(<Board channel={channel || 'stream'} />, document.getElementById("scoreboard"));
}
