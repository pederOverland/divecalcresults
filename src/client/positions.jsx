import logos from "./logos";
import React from "react";

export function StreamPosition(props) {
    const diver = props.diver;
    return (
      <span
        className="position"
        style={{
          backgroundImage: logos[diver.team] && "url(" + logos[diver.team] + ")"
        }}
      >
        {props.hidePosition ? '' : props.showRank ? diver.rank : diver.position}
      </span>
    );
}
export function Flag(props){
  return(
    <img className="flag" src={logos[props.team]} />
  )
}