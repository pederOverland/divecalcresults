import React from "react";

export default class Infoscreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.socket = io("/divecalc");
    this.socket.on(this.props.channel, data => {
      console.log(data);
      this.setState({ competitions: data });
    });
    this.state = { competitions: {}, index: 0 };
  }
  componentWillUnmount() {
    this.socket.off(this.props.channel);
  }
  render() {
    const compName = this.props.competition;
    var compsAsArray = Object.keys(this.state.competitions);
    const comp = compName
      ? this.state.competitions[compName]
      : this.state.competitions[compsAsArray[this.state.index % compsAsArray.length]];
    return comp
      ? <div className="bigscreen">
          <Scoreboard {...comp} cycle={()=>this.setState({index: this.state.index + 1})} />
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
            <button onClick={this.props.cycle}>{data.event.name}</button>
          </div>
        );
      default:
        return false;
    }
  }
}
