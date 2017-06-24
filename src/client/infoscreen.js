import React from "react";

export default class Infoscreen extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("/divecalc");
    this.socket.on(this.props.channel, data => {
      console.log(data);
      this.setState({ competitions: data });
    });
    this.state = { competitions: {} };
  }
  componentWillUnmount() {
    this.socket.off(this.props.channel);
  }
  render() {
    const compName = this.props.competition;
    const comp = compName
      ? this.state.competitions[compName]
      : this.state.competitions[Object.keys(this.state.competitions)[0]];
    return comp
      ? <div className="bigscreen">
          <Scoreboard {...comp} />
        </div>
      : false;
  }
}

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps() {
    this.setState({ slice: 1 });
  }
  render() {
    const data = this.props;
    const dive = data.diver.dive;
    const showHeight = true; //["5", "7.5", "10"].indexOf(dive.height) >= 0;
    switch (data.action) {
      case "dive":
        return (
          <div className="infoScreen">
            <h1>{dive.dive}</h1>
            {showHeight && <h1>{dive.height}m</h1>}
          </div>
        );
      default:
        return false;
    }
  }
}
