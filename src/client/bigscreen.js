import React from "react";
import dives from "./dives";
import logos from "./logos";
import _ from "lodash";

let hideScore = false;

export default class Bigscreen extends React.Component {
  constructor(props) {
    super(props);
    hideScore = window.getParameterByName("hideScore")!==null;
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
    var competitions = _(this.state.competitions).sortBy(x=>-x.latestUpdate).take(2).sortBy(x=>x.event.name).value();
    return (
      <div className="bigscreen">
        {competitions.map(k =>
          <Scoreboard key={k.event.name} {...k} />
        )}
      </div>
    );
  }
}

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slice: 1 };
    document.title = props.competition;
  }
  componentWillReceiveProps() {
    this.setState({ slice: 1 });
  }
  render() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      delete this.timeout;  
    }
    console.log(this.props);
    //this.timeout = setTimeout((() => this.setState({ data: {} })).bind(this), 6000);
    const data = this.props;
    const diver = data.diver;
    const event = data.event;
    const logo = logos[diver.nationality || diver.team];
    switch (data.action) {
      case "judges":
        const panels = event.judges.panels.map(p => p.judges);
        const judges = [].concat.apply([], panels);
        let numToShow = judges.length;
        event.judges.referee && numToShow++;
        event.judges.assistantReferee && numToShow++;
        return (
          <div className="standings">
            <div className="standingsHeader">
              <div className="competition">
                {event.name}
              </div>
              <div className="description">
                Judges
              </div>
            </div>
            {event.judges.referee &&
              <div className="resultline">
                <div
                  className="position"
                />
                <div className="name">
                  {event.judges.referee.name.toLowerCase()}
                  {event.judges.referee.nationality &&
                    " (" + event.judges.referee.nationality + ")"}
                </div>
                <div className="role">Referee</div>
              </div>}
            {event.judges.assistantReferee &&
              <div className="resultline">
                <div
                  className="position"
                />
                <div className="name">
                  {event.judges.assistantReferee.name.toLowerCase()}
                  {event.judges.assistantReferee.nationality &&
                    " (" + event.judges.assistantReferee.nationality + ")"}
                </div>
                <div className="role">Ass. Referee</div>
              </div>}
            {event.judges.panels.map(p => {
              const prefix = p.panel;
              const showPanel = event.judges.panels.length > 1;
              let count = 0;
              let curr = null;
              return p.judges.map(j => {
                const postfix = j.type ? (j.type == "SYNCRO" ? "S" : "E") : "";
                if (curr != postfix) {
                  curr = postfix;
                  count = 0;
                }
                count += 1;
                return <div className="resultline" key={j.position}>
                    <div className="position" />
                    <div className="name">
                      {j.name.toLowerCase()}
                      {j.nationality && " (" + j.nationality + ")"}
                    </div>
                    <div className="role">
                      {postfix}&nbsp;{count}
                      {showPanel ? "(" + p.panel + ")" : ""}
                    </div>
                  </div>;
              });
            })}
            {numToShow < 11 &&
              <div className="standingsFooter">
                {data.competition}
              </div>}
          </div>
        );
      case "startlist":
      case "results":
        const startlist = data.action == "startlist";
        let results = startlist
          ? event.results.sort((a, b) => a.position - b.position)
          : event.results;
        const size = results.length;
        if (size > 9) {
          const start = (this.state.slice - 1) * 9;
          results = results.slice(start, start + 9);
          if (start > size) {
            setTimeout(()=>this.setState({slice:1}), 10);
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
            {results.map((r, i) =>
              <div className="resultline" key={i}>
                <div
                  className="position"
                  style={{ backgroundImage: "url(" + (logos[r.nationality] || logos[r.team]) + ")", backgroundSize: "contain" }}
                />
                <div className="name">
                  {startlist ? r.position : r.rank}.&nbsp;{r.name.toLowerCase()}
                  {r.nationality && " (" + r.nationality + ")"}
                </div>
                {!startlist && <div className="points">{r.result}</div>}
              </div>
            )}
            <div className="standingsFooter">
              {data.competition}
            </div>
          </div>
        );
      default:
        const match = /(\d+)(\w)/.exec(diver.dive.dive);
        const diveName = dives[match[1]];
        const divePos = match[2];
        const showHeight = ["5", "7.5", "10", "7,5"].indexOf(diver.dive.height) >= 0;
        return (
          <div className="standings">
            <div className="standingsHeader">
              <div className="competition">
                {event.name}
              </div>
              {!hideScore &&
              <div className="description">
                {"Top " +
                  event.results.filter(r => r.rank > 0).slice(0, 5).length +
                  " round " +
                  event.round}
              </div>
              }
            </div>
            {!hideScore && event.results.filter(r => r.rank > 0).slice(0, 5).map((r, i) =>
              <div className="resultline" key={i}>
                <div
                  className="position"
                  style={{ backgroundImage: "url(" + (logos[r.nationality] || logos[r.team]) + ")", backgroundSize: "contain" }}
                />
                <div className="name">
                  {r.rank}.&nbsp;{r.name.toLowerCase()}
                  {r.nationality && " (" + r.nationality + ")"}
                </div>
                <div className="points">{r.result}</div>
              </div>
            )}
            <div className="spacer" />
            <div className="diver">
              <div
                className="position"
                style={{ backgroundImage: "url(" + logo + ")" }}
              />
              {showHeight
                ? <div className="name">
                    {diver.position + ". " + diver.name.toLowerCase()}
                    {diver.nationality &&
                      " (" + diver.nationality + ")"} ({event.round + "/" + event.rounds})
                  </div>
                : <div className="name">
                    {diver.position + ". " + diver.name.toLowerCase()}
                    {diver.nationality && " (" + diver.nationality + ")"}
                  </div>}
              {showHeight
                ? <div className="round">{diver.dive.height} m</div>
                : <div className="round">
                    {event.round + "/" + event.rounds}
                  </div>}
              <div className="bsdive">
                <div className="code">{diver.dive.dive}</div>
                <div className="dd">{diver.dive.dd}</div>
              </div>
            </div>
            {data.action == "dive"
              ? <div className="whiteline awardline">
                  <div>Current rank: {hideScore ? "N/A" : diver.rank}</div>
                  <div>Total: {diver.result}</div>
                  <div className="divename">{diveName}</div>
                </div>
              : false}
            {data.action == "awards"
              ? <div className="whiteline awardline">
                  {diver.dive.effectiveAwards.map((a, i) =>
                    <div className="result" key={i}>{a}</div>
                  )}
                </div>
              : false}
            {data.action == "awards"
              ? <div className="whiteline awardline">
                  <div>Dive: {diver.dive.result}</div>
                  <div>Total: {diver.result}</div>
                  <div>Rank: {hideScore ? "N/A" : diver.rank}</div>
                </div>
              : false}
            {data.action == "awards" &&
              (!/0[,.]0/.test(diver.dive.penalty) ||
                diver.dive.maxAward != "10")
              ? <div className="whiteline awardline">
                  {!/0[,.]0/.test(diver.dive.penalty) &&
                    <div>Penalty: {diver.dive.penalty}</div>}
                  {diver.dive.maxAward != "10" &&
                    <div>Max award: {diver.dive.maxAward}</div>}
                </div>
              : false}
          </div>
        );
    }
  }
}
