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
        {diver.position}
      </span>
    );
}
