import React from "react";

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("/divecalc");
    this.socket.on(this.props.channel, data => {
      this.setState({ competitions: data });
    });
    this.state = { competitions: {} };
  }
  componentWillUnmount() {
    this.socket.off(this.props.channel);
  }
  render() {
    var competitions = Object.keys(this.state.competitions);
    return (
      <div className="controls">
        <div className="controls-header">
          <h2>
            {competitions.length
              ? "Active Competitions:"
              : "No active competitions"}
          </h2>
          <button
            onClick={() => {
              this.socket.emit(this.props.channel, {
                type: "command",
                command: "clearAll"
              });
            }}
          >
            Clear all
          </button>
        </div>
        {competitions.map(k =>
          <Control
            key={k}
            onDelete={() => {
              this.socket.emit("command", {
                type: "command",
                channel: this.props.channel,
                command: "clear",
                argument: k
              });
            }}
            {...this.state.competitions[k]}
          />
        )}
      </div>
    );
  }
}

class Control extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props = this.props;
    return (
      <div className="control">
        <h3>{props.event.name}</h3>
        <button onClick={props.onDelete}>Clear this competition</button>
      </div>
    );
  }
}
