import React from 'react';
import { useStopwatch, useTime } from 'react-timer-hook';

function MyStopwatch() {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false })
    useTime({ format: '12-hour' });


    return (
        <div className='time-border'>
            <p className='heading' style={{color: "#c9c73772"}}>Your working hours</p>
            <div style={{ color: "white", display: "flex", justifyContent: "center" }}>
                <p>
                    <p className="para2">Hours</p>
                    <p className='time'>{hours}</p>
                    <button className='btn1 h' onClick={start}>Start</button>
                </p>
                <p>
                    <p className="para2">Minutes</p>
                    <p className='time'>{minutes}</p>
                    <button className='btn1 h' onClick={pause}>Pause</button>
                </p>
                <p>
                    <p className="para2">Seconds</p>
                    <p className='time'>{seconds}</p>
                    <button className='btn1 h' onClick={reset}>Reset</button>
                </p>
            </div>
            
            
        </div>
    );
}

export default function App() {
    return (
        <div>
            <MyStopwatch />
        </div>
    );
}