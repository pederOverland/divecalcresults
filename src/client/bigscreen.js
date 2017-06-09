import React from "react";
import dives from "./dives";
import logos from "./logos";

export default class Bigscreen extends React.Component {
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
    this.state = { slice: 1 };
  }
  componentWillReceiveProps() {
    this.setState({ slice: 1 });
  }
  render() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      delete this.timeout;
    }
    //this.timeout = setTimeout((() => this.setState({ data: {} })).bind(this), 6000);
    const data = this.props;
    const diver = data.diver;
    const event = data.event;
    const logo = logos[diver.nationality || diver.team];
    switch (data.action) {
      case "startlist":
      case "results":
        const startlist = data.action == "startlist";
        let results = startlist
          ? event.results.sort((a, b) => a.position - b.position)
          : event.results;
        const size = results.length;
        if (size > 10) {
          const start = (this.state.slice - 1) * 10;
          results = results.slice(start, start + 10);
          if (start > size) {
            return false;
          }
          this.timeout = setTimeout(
            (() => this.setState({ slice: this.state.slice + 1 })).bind(this),
            15000
          );
        }
        return (
          <div className="standings">
            <div className="standingsHeader">
              <div className="competition">
                {event.name}
              </div>
              <div className="description">
                {startlist ? "Startlist" : "Result round " + event.round}
              </div>
            </div>
            {results.map((r, i) => (
              <div className="resultline" key={i}>
                <div
                  className="position"
                  style={{ backgroundImage: "url(" + logos[r.team] + ")" }}
                />
                <div className="name">
                  {startlist ? r.position : r.rank}. {r.name.toLowerCase()}{r.nationality && " ("+r.nationality+")"}
                </div>
                {!startlist && <div className="points">{r.result}</div>}
              </div>
            ))}
            <div className="standingsFooter">
              {data.competition}
            </div>
          </div>
        );
      default:
        const match = /(\d+)(\w)/.exec(diver.dive.dive);
        const diveName = dives[match[1]];
        const divePos = match[2];
        const showHeight = ["5", "7.5", "10"].indexOf(diver.dive.height) >= 0;
        return (
          <div className="standings">
            <div className="standingsHeader">
              <div className="competition">
                {event.name}
              </div>
              <div className="description">
                {"Top " +
                  event.results.filter(r=>r.rank > 0).slice(0, 5).length +
                  " round " +
                  event.round}
              </div>
            </div>
            {event.results.filter(r=>r.rank > 0).slice(0, 5).map((r, i) => (
              <div className="resultline" key={i}>
                <div
                  className="position"
                  style={{ backgroundImage: "url(" + logos[r.team] + ")" }}
                />
                <div className="name">{r.rank}. {r.name.toLowerCase()}{r.nationality && " ("+r.nationality+")"}</div>
                <div className="points">{r.result}</div>
              </div>
            ))}
            <div className="spacer" />
            <div className="diver">
              <div
                className="position"
                style={{ backgroundImage: "url(" + logo + ")" }}
              />
              {showHeight ? 
                <div className="name">{diver.position + ". " + diver.name.toLowerCase()}{diver.nationality && " ("+diver.nationality+")"} ({event.round + "/" + event.rounds})</div> :
                <div className="name">{diver.position + ". " + diver.name.toLowerCase()}{diver.nationality && " ("+diver.nationality+")"}</div>
              }
              {showHeight ?
                <div className="round">{diver.dive.height} m</div> :
                <div className="round">{event.round + "/" + event.rounds}</div>
              }
              <div className="bsdive">
                <div className="code">{diver.dive.dive}</div>
                <div className="dd">{diver.dive.dd}</div>
              </div>
            </div>
            {data.action == "dive"
              ? <div className="whiteline awardline">
                  <div>Current rank: {diver.rank}</div>
                  <div>Total: {diver.result}</div>
                  <div className="divename">{diveName}</div>
                </div>
              : false}
            {data.action == "awards"
              ? <div className="whiteline awardline">
                  {diver.dive.effectiveAwards.map((a, i) => (
                    <div className="result" key={i}>{a}</div>
                  ))}
                </div>
              : false}
            {data.action == "awards"
              ? <div className="whiteline awardline">
                  <div>Dive: {diver.dive.result}</div>
                  <div>Total: {diver.result}</div>
                  <div>Rank: {diver.rank}</div>
                </div>
              : false}
            {data.action == "awards" && (diver.dive.penalty != "0.0" || diver.dive.maxAward != "10")
              ? <div className="whiteline awardline">
                  {diver.dive.penalty != "0.0" && <div>Penalty: {diver.dive.penalty}</div>}
                  {diver.dive.maxAward != "10" && <div>Max award: {diver.dive.maxAward}</div>}
                </div>
              : false}
          </div>
        );
    }
  }
}
