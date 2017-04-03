"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

Scoreboard = function (_React$Component) {_inherits(Scoreboard, _React$Component);
  function Scoreboard(props) {_classCallCheck(this, Scoreboard);var _this = _possibleConstructorReturn(this, (Scoreboard.__proto__ || Object.getPrototypeOf(Scoreboard)).call(this,
    props));
    _this.state = { data: startList, slice: 1 };
    _this.socket = io("/divecalc");
    _this.socket.on("divecalc", function (data) {
      _this.setState({ data: data, slice: 1 });
    });return _this;
  }_createClass(Scoreboard, [{ key: "componentWillUnmount", value: function componentWillUnmount()
    {
      this.socket.off("divecalc");
    } }, { key: "render", value: function render()
    {var _this2 = this;
      if (this.timeout) {
        clearTimeout(this.timeout);
        delete this.timeout;
      }
      //this.timeout = setTimeout((() => this.setState({ data: {} })).bind(this), 6000);
      var data = this.state.data;
      var diver = data.diver;
      var event = data.event;
      switch (data.action) {
        case "startlist":
        case "results":
          var startlist = data.action == "startlist";
          var results = startlist ?
          event.results.sort(function (a, b) {return a.position - b.position;}) :
          event.results;
          var size = results.length;
          if (size > 10) {
            var start = (this.state.slice - 1) * 10;
            results = results.slice(start, start + 10);
            if (start > size) {
              return false;
            }
            this.timeout = setTimeout(
            function () {return _this2.setState({ slice: _this2.state.slice + 1 });}.bind(this),
            6000);

          }
          return (
            _react2.default.createElement("div", { className: "standings" },
              _react2.default.createElement("div", { className: "standingsHeader" },
                _react2.default.createElement("div", { className: "competition" },
                  event.name),

                _react2.default.createElement("div", { className: "description" },
                  startlist ?
                  "Startliste" :
                  "Resultat etter runde " + event.round)),


              results.map(function (r, i) {return (
                  _react2.default.createElement("div", { className: "resultline", key: i },
                    _react2.default.createElement("div", { className: "position" },
                      startlist ? r.position : r.rank),

                    _react2.default.createElement("div", { className: "name" }, r.name),
                    !startlist && _react2.default.createElement("div", { className: "points" }, r.result)));}),


              _react2.default.createElement("div", { className: "standingsFooter" },
                data.competition)));



        case "dive":
          return (
            _react2.default.createElement("div", { className: "dive" },
              _react2.default.createElement("div", { className: "header" },
                _react2.default.createElement("span", { className: "position" }, diver.position),
                _react2.default.createElement("span", { className: "name" }, diver.name)),

              _react2.default.createElement("div", { className: "data" },
                _react2.default.createElement("div", { className: "item" },
                  _react2.default.createElement("div", null, "Runde ", diver.dive.position, "/", event.rounds),
                  _react2.default.createElement("div", null, "Stup ", diver.dive.dive)),

                _react2.default.createElement("div", { className: "item" },
                  _react2.default.createElement("div", null, "Vanskelighetsgrad"),
                  _react2.default.createElement("div", null, diver.dive.dd))),


              _react2.default.createElement("div", { className: "data" },
                _react2.default.createElement("div", { className: "item" },
                  _react2.default.createElement("div", null, "N\xE5v\xE6rende plassering"),
                  _react2.default.createElement("div", null, diver.rank)),

                _react2.default.createElement("div", { className: "item" }))));



        case "awards":
          return (
            _react2.default.createElement("div", { className: "awards" },
              _react2.default.createElement("div", { className: "header" },
                _react2.default.createElement("span", { className: "position" }, diver.position),
                _react2.default.createElement("span", { className: "name" }, diver.name)),

              _react2.default.createElement("div", { className: "data" },
                _react2.default.createElement("div", { className: "item" },
                  _react2.default.createElement("div", null, "Runde ", event.round, "/", event.rounds)),

                _react2.default.createElement("div", { className: "item" },
                  _react2.default.createElement("div", null, "Stup ", _react2.default.createElement("strong", null, diver.dive.result)),
                  _react2.default.createElement("div", null, "Total ", _react2.default.createElement("strong", null, diver.dive.total)))),


              _react2.default.createElement("div", { className: "data judgeAwards" },
                diver.dive.actualAwards.map(function (a, i) {return (
                    _react2.default.createElement("div", { className: "judgeAward", key: i }, a));}))));




        default:
          return _react2.default.createElement("div", null);}

    } }]);return Scoreboard;}(_react2.default.Component);exports.default = Scoreboard;


var startList = {
  endDateFmt: "Jan 15, 2017",
  endDate: 1484470986000,
  action: "startlist",
  dateFmt: "Mar 7, 2017",
  competition: "Landslagstest",
  place: "AdO arena, Bergen",
  dateTimeFmt: "3/7/17 1:29 PM",
  event: {
    divesPerRound: 1,
    round: 8,
    startTimeFmt: "1/15/17 2:00 PM",
    name: "Teskonkurranse 3m, Forsøk",
    startTime: 1484485200000,
    finished: true,
    pk: 2,
    endTime: 1484488800000,
    endTimeFmt: "1/15/17 3:00 PM",
    type: "TEAM",
    results: [
    {
      result: "220.35",
      name: "Anne Sofie Moe Holm / Julie Synnøve Thorsen",
      rank: 1,
      pk: 4,
      position: 2,
      team: "BS.",
      shortName: "A. Holm / J. Thorsen" },

    {
      result: "219.90",
      diffToFirst: "-0.45",
      name: "Amalie Marie Kupka / Serina Haldorsen",
      rank: 2,
      pk: 3,
      position: 4,
      team: "BS.",
      shortName: "A. Kupka / S. Haldorsen" },

    {
      result: "197.00",
      diffToFirst: "-23.35",
      name: "Jonas Erik Thorsen / Martin Nåden Dyrstad",
      rank: 3,
      pk: 8,
      position: 6,
      team: "B/S",
      shortName: "J. Thorsen / M. Nåden Dyrstad" },

    {
      result: "191.35",
      diffToFirst: "-29.00",
      name: "Caroline Sofie Kupka / Safyia Elmrani",
      rank: 4,
      pk: 5,
      position: 3,
      team: "B/S",
      shortName: "C. Kupka / S. Elmrani" },

    {
      result: "187.75",
      diffToFirst: "-32.60",
      name: "Emil Ruenes Jacobsen / Philip Sandve",
      rank: 5,
      pk: 6,
      position: 1,
      team: "KS.",
      shortName: "E. Jacobsen / P. Sandve" },

    {
      result: "180.80",
      diffToFirst: "-39.55",
      name: "Henry Kristiansen / Ulrik Hvarnes Evensen",
      rank: 6,
      pk: 7,
      position: 5,
      team: "SP.",
      shortName: "Kristiansen / Hvarnes Evensen" }],


    rounds: 8 },

  diver: {
    result: "187.75",
    name: "Emil Ruenes Jacobsen / Philip Sandve",
    rank: 5,
    pk: 6,
    position: 1,
    team: "KS.",
    dive: {
      dd: "1.7",
      actualAwards: ["3.0", "3.5", "3.0"],
      penalty: "0.0",
      sum: "9.50",
      result: "16.15",
      total: "58.55",
      effectiveAwards: ["3.0", "3.5", "3.0"],
      maxAward: "10",
      position: 3,
      dive: "401A",
      height: "3" },

    shortName: "E. Jacobsen / P. Sandve" },

  startDate: 1484470986000,
  startDateFmt: "Jan 15, 2017",
  latestUpdate: 1488889771221 };


var baseAward = {
  endDateFmt: "Jan 15, 2017",
  endDate: 1484470986000,
  action: "awards",
  dateFmt: "Mar 7, 2017",
  competition: "Landslagstest",
  place: "AdO arena, Bergen",
  dateTimeFmt: "3/7/17 10:02 AM",
  event: {
    divesPerRound: 1,
    round: 1,
    startTimeFmt: "1/15/17 10:03 AM",
    name: "Testkonkurranse 3m x, Forsøk",
    startTime: 1484470986000,
    finished: true,
    pk: 13,
    endTime: 1484470986000,
    endTimeFmt: "1/15/17 10:03 AM",
    type: "NORMAL",
    results: [
    {
      result: "19.20",
      name: "Caroline Sofie Kupka",
      rank: 1,
      pk: 54,
      position: 2,
      team: "BS.",
      shortName: "Caroline Sofie Kupka" },

    {
      result: "3.60",
      diffToFirst: "-15.60",
      name: "Anne Sofie Moe Holm",
      rank: 2,
      pk: 53,
      position: 1,
      team: "BS.",
      shortName: "Anne Sofie Moe Holm" }],


    rounds: 1 },

  diver: {
    result: "19.20",
    name: "Caroline Sofie Kupka",
    rank: 1,
    pk: 54,
    position: 2,
    team: "BS.",
    dive: {
      dd: "1.2",
      actualAwards: ["5.0", "6.0", "5.0"],
      penalty: "0.0",
      sum: "16.00",
      result: "19.20",
      total: "19.20",
      effectiveAwards: ["5.0", "6.0", "5.0"],
      maxAward: "10",
      position: 1,
      dive: "101C",
      height: "1" },

    shortName: "Caroline Sofie Kupka" },

  startDate: 1484470986000,
  startDateFmt: "Jan 15, 2017",
  latestUpdate: 1488877365912 };


var baseDive = {
  endDateFmt: "Jan 15, 2017",
  endDate: 1484470986000,
  action: "dive",
  dateFmt: "Mar 7, 2017",
  competition: "Landslagstest",
  place: "AdO arena, Bergen",
  dateTimeFmt: "3/7/17 8:54 AM",
  event: {
    divesPerRound: 1,
    round: 1,
    startTimeFmt: "1/15/17 10:03 AM",
    name: "Testkonkurranse 3m x, Forsøk",
    startTime: 1484470986000,
    finished: false,
    pk: 13,
    endTime: 1484470986000,
    endTimeFmt: "1/15/17 10:03 AM",
    type: "NORMAL",
    results: [
    {
      result: "3.60",
      pending: false,
      name: "Anne Sofie Moe Holm",
      rank: 1,
      pk: 53,
      position: 1,
      team: "BS.",
      shortName: "Anne Sofie Moe Holm" },

    {
      result: "0.00",
      diffToFirst: "-3.60",
      needAwards: [{ toRank: 1, award: "1" }],
      pending: true,
      name: "Caroline Sofie Kupka",
      rank: 2,
      pk: 54,
      position: 2,
      team: "BS.",
      shortName: "Caroline Sofie Kupka" }],


    rounds: 1 },

  diver: {
    result: "0.00",
    needAwards: [{ toRank: 1, award: "1" }],
    name: "Caroline Sofie Kupka",
    rank: 2,
    pk: 54,
    position: 2,
    team: "BS.",
    dive: { dd: "1.2", position: 1, dive: "101C", height: "1" },
    shortName: "Caroline Sofie Kupka" },

  startDate: 1484470986000,
  startDateFmt: "Jan 15, 2017",
  latestUpdate: 1488873245148 };