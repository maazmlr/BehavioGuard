import React from "react";
import "./ControlButtons.css";

export default function ControlButtons(props) {
	const ActiveButtons = (
		<div className="btn-grp mb-4 mt-4">
			<div className="btn-1 btn-one"
				onClick={props.handlePauseResume}>
				{props.isPaused ? "Resume" : "Pause"}
			</div>
		</div>
	);

	return (
		<div className="Control-Buttons">
			<div>{ActiveButtons}</div>
		</div>
	);
}
