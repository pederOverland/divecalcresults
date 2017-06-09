import React from "react";

export default class Infoscreen extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("/divecalc");
    this.socket.on(this.props.channel, data => {
      console.log(data);
      const key = data.event.name;
      const c = Object.assign({}, this.state.competitions);
      c[key] = data;
      this.setState({ competitions: c });
    });
    this.state = { competitions: {} };
  }
  componentWillUnmount() {
    this.socket.off(this.props.channel);
  }
  render() {
    return (
      <div className="bigscreen">
        {Object.keys(this.state.competitions).map(k => (
          <Scoreboard key={k} {...this.state.competitions[k]} />
        ))}
      </div>
    );
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
        )
      default:
        return false;
    }
  }
}