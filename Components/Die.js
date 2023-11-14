import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };

    let dieFace;
    let dieValue = props.value;

    if (dieValue === 1) {
        dieFace = (
            <div className="die first-face" style={styles} onClick={props.holdDice}>
                <span className="dot"> </span>
            </div>
        );
    } else if (dieValue === 2) {
        dieFace = (
            <div className="die second-face" style={styles} onClick={props.holdDice}>
                <span className="dot"> </span>
                <span className="dot"> </span>
            </div>
        );
    } else if (dieValue === 3) {
        dieFace = (
            <div className="die third-face" style={styles} onClick={props.holdDice}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        );
    } else if (dieValue === 4) {
        dieFace = (
            <div className="die fourth-face" style={styles} onClick={props.holdDice}>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    } else if (dieValue === 5) {
        dieFace = (
            <div className="die fifth-face" style={styles} onClick={props.holdDice}>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    } else if (dieValue === 6) {
        dieFace = (
            <div className="die sixth-face" style={styles} onClick={props.holdDice}>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    }

    return dieFace;
}
