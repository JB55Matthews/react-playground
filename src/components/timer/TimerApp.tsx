import { useState } from 'react';
import "../../styles/timer/TimerApp.css";
import Clock from './Clock';


function TimerApp() {

const [mode, setMode] = useState("stopwatch");

    return(
        <>
        <div className="tab-switcher">
            <button className={mode === 'stopwatch' ? 'active' : ''} onClick={() => setMode('stopwatch')}>Stopwatch</button>
            <button className={mode === 'timer' ? 'active' : ''} onClick={() => setMode('timer')}>Timer</button>
        </div>
        <Clock mode={mode}/>
        </>
    )
    
}

export default TimerApp