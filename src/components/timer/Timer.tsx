import { useState, useEffect, useRef } from 'react';
import '../../styles/timer/Timer.css';

export default function Timer() {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const intervalIdRef = useRef(0);

    useEffect(() => {
        if (isRunning && elapsedTime > 0) {
            intervalIdRef.current = setInterval(() => {
            setElapsedTime(prev => {
            if (prev <= 1000) {
                clearInterval(intervalIdRef.current!);
                setIsRunning(false);
                return 0;
                }
            return prev - 1000;
            });
        }, 1000);
        }

        return () => clearInterval(intervalIdRef.current!);
    }, [isRunning]);

    function calculateTimeInMs() {
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const s = parseInt(seconds) || 0;
        return ((h * 60 * 60) + (m * 60) + s) * 1000;
      };

      function start() {
        if (!hasStarted) {
          const total = calculateTimeInMs();
          if (total > 0) {
            setElapsedTime(total);
            setHasStarted(true);
            setIsRunning(true);
          }
        } else if (!isRunning && elapsedTime > 0) {
          // Resuming from pause
          setIsRunning(true);
        }
      }

      function stop() {
        setIsRunning(false);
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = 0;
        }
      }


    function reset() {
        setIsRunning(false);
        setHasStarted(false);
        setElapsedTime(0);
        setHours("00");
        setMinutes("00");
        setSeconds("00");
    };

    function formatTime(){
      let hours = Math.floor(elapsedTime / (1000*60*60));
      let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
      let seconds = Math.floor(elapsedTime / (1000) % 60);

      return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  }

    return (
    <div className="timer-container">
      {!hasStarted ? (
        <div className="time-inputs">
          <input type="number" value={hours} min="0"  max="23"
            onChange={e => setHours(e.target.value)}/>:
          <input type="number" value={minutes} min="0" max="59"
            onChange={e => setMinutes(e.target.value)}/>:
          <input type="number" value={seconds} min="0" max="59"
            onChange={e => setSeconds(e.target.value)}/>
        </div>
      ) : (
        <div className="display">{formatTime()}</div>
      )}


        <div className="controls">
            <button onClick={start} className="start-button">Start</button>
            <button onClick={stop} className="stop-button">Stop</button>
            <button onClick={reset} className="reset-button">Reset</button>
        </div>
       
    </div>
  );
}