import React, { useEffect, useState } from 'react';

export default function Scoreboard(props) {
    console.log('Rendering Scoreboard');
    console.log("passed final time: " + props.finalTime);

    // Use useState to manage the bestTime state and totalTimeColor
    const [bestTime, setBestTime] = useState(() => {
        // Retrieve best time from localStorage
        return JSON.parse(localStorage.getItem("bestTime")) || null;
    });
    const [totalTimeColor, setTotalTimeColor] = useState({});

    useEffect(() => {
        // Check if the current finalTime is less than the stored bestTime
        if (props.finalTime < bestTime || bestTime === null) {
            // Update bestTime in state
            setBestTime(props.finalTime);
            // Update bestTime in localStorage
            localStorage.setItem("bestTime", JSON.stringify(props.finalTime));

            // Update totalTimeColor based on the comparison
            setTotalTimeColor({
                color: props.finalTime >= bestTime ? "#59E391" : "black"
            });
        }

        // Log the updated best time
        console.log("Updated best time: " + bestTime);
    }, [props.finalTime, bestTime]); // Include bestTime in the dependency array

    let unitOfTime;

    if ((props.finalTime / 1000) < 1) {
        unitOfTime = " ms";
    } else if ((props.finalTime / 1000) >= 1) {
        unitOfTime = " sec";
    } else {
        unitOfTime = " min";
    }

    const displayedTime = props.finalTime !== null ? props.formatTime(props.finalTime) : 'N/A';
    const bestTimeDisplay = bestTime !== null ? props.formatTime(bestTime) : 'N/A';

    return (
        <div className="scoreboard-container">
            <h1>Game over</h1>
            <h3>Number of Rolls: {props.numRolls}</h3>
            {props.finalTime !== null && (
                <h3>Total time: <span style={totalTimeColor}>{displayedTime}<small>{unitOfTime}</small></span></h3>
            )}
            <h3>Best time: <span style={{ color: "#59E391" }}>{bestTimeDisplay}<small>{unitOfTime}</small></span></h3>
        </div>
    );
}

