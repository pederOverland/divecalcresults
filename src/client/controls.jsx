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
    console.log(this.socket)
    var competitions = Object.keys(this.state.competitions);
    return (
      <div className="controls">
        <div className="commercial-control">
        <h2>Reklame</h2>
          <button onClick={()=>{
            this.socket.emit("command", {
              type:"command",
              channel:this.props.channel,
              command: "commercial",
              argument: "rubb.jpg"
            });
          }}>Rubb</button>
          <button onClick={()=>{
            this.socket.emit("command", {
              type:"command",
              channel:this.props.channel,
              command: "commercial",
              argument: "gtravel.png"
            });
          }}>GTravel</button>
          <button onClick={()=>{
            this.socket.emit("command", {
              type:"command",
              channel:this.props.channel,
              command: "commercial",
              argument: "zanderk.svg"
            });
          }}>Zander K</button>
          <button onClick={()=>{
            this.socket.emit("command", {
              type:"command",
              channel:this.props.channel,
              command: "commercial",
              argument: "takktil.png"
            });
          }}>Takk til Bergen kommune & ADO</button>
        </div>
        <div className="controls-header">
          <h2>
            {competitions.length
              ? "Active Competitions:"
              : "No active competitions"}
          </h2>
          <button
            onClick={() => {
              this.socket.emit("command", {
                type: "command",
                channel: this.props.channel,
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
