import logos from "./logos";
import React from "react";

export function StreamPosition(props) {
    const diver = props.diver;
    return (
      <span
        className="position"
        style={{
          backgroundImage: (logos[diver.team] || props.override) && "url(" + (props.override || logos[diver.team]) + ")",
          backgroundSize: '100%'
        }}
      >
        {props.hidePosition ? '' : props.showRank ? diver.rank : diver.position}
      </span>
    );
}
export function Flag(props){
  return(
    <img className="flag" src={props.override || logos[props.team]} />
  )
}