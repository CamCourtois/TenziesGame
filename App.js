import React from "react"
import Die from "./Components/Die"
import Scoreboard from "./Components/Scoreboard"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [gameState, setGameState] = React.useState("start")
    const [isRunning, setIsRunning] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [finalTime, setFinalTime] = React.useState(null)
    const intervalRef = React.useRef();
    
    
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function renderGame() {
        if (gameState === "end") {
            setGameState("start");
            setRolls(0)
        } 
        else if (gameState === "start") {
            setGameState("inGame");
            toggleStartStop(); // Start the stopwatch when the game is in progress
        }

        
        setRolls(prevRolls => prevRolls + 1)
        
        
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    React.useEffect(() => {
        if(tenzies){
            setGameState(prevState => "end")    
        }
    }, [tenzies])
    
    //STOPWATCH LOGIC
    
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${millisecondsPart}`;
    }
  
    const updateStopwatch = () => {
        setElapsedTime((prevTime) => prevTime + 10);
    };
    
    const toggleStartStop = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(updateStopwatch, 10);
        }
        setIsRunning(!isRunning);
  };
  
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };
    
//   const saveFinalElapsedTime = (time) => {
//     setFinalTime((prevFinalTime) => time);
//     resetStopwatch();

    
//   };
  
 React.useEffect(() => {
     
    if (gameState === "end") {
        console.log('Game ended. Elapsed Time:', elapsedTime);

        // Set finalTime directly without using setTimeout
        setFinalTime(elapsedTime);

        // Stop the stopwatch when the game ends
        toggleStartStop();

        // Reset the stopwatch
        resetStopwatch();
    }
}, [gameState]);

React.useEffect(() => {
    // Additional useEffect to handle finalTime changes
    console.log("Final time changed:", finalTime);
}, [finalTime]);
    
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            {gameState === "inGame" && 
                <div className="stopwatch-container">
                    <div className="stopwatch-display">{formatTime(elapsedTime)}</div>
                </div>
            }
            {
                gameState === "inGame" && 
                <div className="dice-container">
                    {diceElements}
                </div>
            }
            {tenzies && <Confetti />}
            {
                gameState === "end" && <Scoreboard  numRolls={rolls} formatTime={formatTime} finalTime={finalTime}  />
            }
            
            <button 
                className="roll-dice" 
                onClick={renderGame}
            >
                {(tenzies || gameState === "start") ? "New Game" : "Roll"}
            </button>
        </main>
    )
}