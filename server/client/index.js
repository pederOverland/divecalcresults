"use strict";var _react = require("react");var _react2 = _interopRequireDefault(_react);
var _reactDom = require("react-dom");var _reactDom2 = _interopRequireDefault(_reactDom);
var _scoreboard = require("./scoreboard.js");var _scoreboard2 = _interopRequireDefault(_scoreboard);
require("./scoreboard.scss");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_reactDom2.default.render(_react2.default.createElement(_scoreboard2.default, null), document.getElementById("scoreboard"));