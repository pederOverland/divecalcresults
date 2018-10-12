import React from "react";
import ReactDOM from "react-dom";
import Board from "./scoreboard";
import Screen from "./bigscreen.js";
import InfoScreen from "./infoscreen.js";
import Controls from "./controls.js";
import "./scoreboard.scss";

window.getParameterByName = function(name, url) {
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
const competition = getParameterByName("competition");

if (document.body.classList.contains("bigscreen")) {
  ReactDOM.render(<Screen channel={channel || 'screen'} />, document.getElementById("scoreboard"));
} else if(document.body.classList.contains("infoscreen")){
  ReactDOM.render(<InfoScreen competition={competition} channel={channel || 'screen'} />, document.getElementById("scoreboard"));
} else if(document.body.classList.contains("controls")){
  ReactDOM.render(<Controls channel={channel || 'screen'} />, document.getElementById("scoreboard"));
} else {
  ReactDOM.render(<Board competition={competition} channel={channel || 'stream'} />, document.getElementById("scoreboard"));
}
