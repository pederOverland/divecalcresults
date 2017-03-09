import React from "react";

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: startList, slice: 1 };
    this.socket = io("/divecalc");
    this.socket.on("divecalc", data => {
      this.setState({ data: data, slice: 1 });
    });
  }
  componentWillUnmount() {
    this.socket.off("divecalc");
  }
  render() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      delete this.timeout;
    }
    //this.timeout = setTimeout((() => this.setState({ data: {} })).bind(this), 6000);
    const data = this.state.data;
    const diver = data.diver;
    const event = data.event;
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
          if (size > start + 10) {
            this.timeout = setTimeout(
              (() => this.setState({ slice: this.state.slice + 1 })).bind(this),
              6000
            );
          }
        }
        return (
          <div className="standings">
            <div className="standingsHeader">
              <div className="competition">
                {event.name}
              </div>
              <div className="description">
                {startlist
                  ? "Startliste"
                  : "Resultat etter runde " + event.round}
              </div>
            </div>
            {results.map((r, i) => (
              <div className="resultline" key={i}>
                <div className="position">
                  {startlist ? r.position : r.rank}
                </div>
                <div className="name">{r.name}</div>
                {!startlist && <div className="points">{r.result}</div>}
              </div>
            ))}
            <div className="standingsFooter">
              {data.competition}
            </div>
          </div>
        );
      case "dive":
        return (
          <div className="dive">
            <div className="header">
              <span className="position">{diver.position}</span>
              <span className="name">{diver.name}</span>
            </div>
            <div className="data">
              <div className="item">
                <div>Runde {diver.dive.position}/{event.rounds}</div>
                <div>Stup {diver.dive.dive}</div>
              </div>
              <div className="item">
                <div>Vanskelighetsgrad</div>
                <div>{diver.dive.dd}</div>
              </div>
            </div>
            <div className="data">
              <div className="item">
                <div>Nåværende plassering</div>
                <div>{diver.rank}</div>
              </div>
              <div className="item" />
            </div>
          </div>
        );
      case "awards":
        return (
          <div className="awards">
            <div className="header">
              <span className="position">{diver.position}</span>
              <span className="name">{diver.name}</span>
            </div>
            <div className="data">
              <div className="item">
                <div>Runde {event.round}/{event.rounds}</div>
              </div>
              <div className="item">
                <div>Stup <strong>{diver.dive.result}</strong></div>
                <div>Total <strong>{diver.dive.total}</strong></div>
              </div>
            </div>
            <div className="data judgeAwards">
              {diver.dive.actualAwards.map((a, i) => (
                <div className="judgeAward" key={i}>{a}</div>
              ))}
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }
}

const startList = {
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
        shortName: "A. Holm / J. Thorsen"
      },
      {
        result: "219.90",
        diffToFirst: "-0.45",
        name: "Amalie Marie Kupka / Serina Haldorsen",
        rank: 2,
        pk: 3,
        position: 4,
        team: "BS.",
        shortName: "A. Kupka / S. Haldorsen"
      },
      {
        result: "197.00",
        diffToFirst: "-23.35",
        name: "Jonas Erik Thorsen / Martin Nåden Dyrstad",
        rank: 3,
        pk: 8,
        position: 6,
        team: "B/S",
        shortName: "J. Thorsen / M. Nåden Dyrstad"
      },
      {
        result: "191.35",
        diffToFirst: "-29.00",
        name: "Caroline Sofie Kupka / Safyia Elmrani",
        rank: 4,
        pk: 5,
        position: 3,
        team: "B/S",
        shortName: "C. Kupka / S. Elmrani"
      },
      {
        result: "187.75",
        diffToFirst: "-32.60",
        name: "Emil Ruenes Jacobsen / Philip Sandve",
        rank: 5,
        pk: 6,
        position: 1,
        team: "KS.",
        shortName: "E. Jacobsen / P. Sandve"
      },
      {
        result: "180.80",
        diffToFirst: "-39.55",
        name: "Henry Kristiansen / Ulrik Hvarnes Evensen",
        rank: 6,
        pk: 7,
        position: 5,
        team: "SP.",
        shortName: "Kristiansen / Hvarnes Evensen"
      }
    ],
    rounds: 8
  },
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
      height: "3"
    },
    shortName: "E. Jacobsen / P. Sandve"
  },
  startDate: 1484470986000,
  startDateFmt: "Jan 15, 2017",
  latestUpdate: 1488889771221
};

const baseAward = {
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
        shortName: "Caroline Sofie Kupka"
      },
      {
        result: "3.60",
        diffToFirst: "-15.60",
        name: "Anne Sofie Moe Holm",
        rank: 2,
        pk: 53,
        position: 1,
        team: "BS.",
        shortName: "Anne Sofie Moe Holm"
      }
    ],
    rounds: 1
  },
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
      height: "1"
    },
    shortName: "Caroline Sofie Kupka"
  },
  startDate: 1484470986000,
  startDateFmt: "Jan 15, 2017",
  latestUpdate: 1488877365912
};

const baseDive = {
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
        shortName: "Anne Sofie Moe Holm"
      },
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
        shortName: "Caroline Sofie Kupka"
      }
    ],
    rounds: 1
  },
  diver: {
    result: "0.00",
    needAwards: [{ toRank: 1, award: "1" }],
    name: "Caroline Sofie Kupka",
    rank: 2,
    pk: 54,
    position: 2,
    team: "BS.",
    dive: { dd: "1.2", position: 1, dive: "101C", height: "1" },
    shortName: "Caroline Sofie Kupka"
  },
  startDate: 1484470986000,
  startDateFmt: "Jan 15, 2017",
  latestUpdate: 1488873245148
};
