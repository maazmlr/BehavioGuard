import React, { useState } from "react";
import "./clock.css";
import Timer from "./Timer/timer";
import ControlButtons from "./ControlButtons/ControlButtons";

function StopWatch() {
	const [isPaused, setIsPaused] = useState(false);
	const [time, setTime] = useState(0);

	React.useEffect(() => {
		let interval = null;

		if (isPaused === false) {
			interval = setInterval(() => {
				setTime((time) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isPaused]);


	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	return (
		<div className="stop-watch mt-10">
			<Timer time={time} />
			<ControlButtons
				isPaused={isPaused}
				handlePauseResume={handlePauseResume}
			/>
		</div>
	);
}

export default StopWatch;
