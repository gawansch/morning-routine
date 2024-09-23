import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const CountdownTimer = ({ initialSeconds, start }: { initialSeconds: number, start: string }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
  // Exit early if countdown is finished
    if (seconds <= 0) {
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds]);

  // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return <>{minutes}:{seconds}</>;
  };
  
  const fractionLeft = (secondsLeft:number, totalSeconds:number) => {
    return ((totalSeconds-secondsLeft)/totalSeconds);
  };

  return (
    <div className="btn btn-lg btn-light fw-bold border-silver bg-gray">
      <div>Countdown Timer</div>
      <div>{start}</div>
      <div>{Moment(Date.now()).format('hh:mm:ss')}</div>
      <div>{formatTime(seconds)}</div>
      <div>Seconds: {seconds} /  Total seconds{initialSeconds}</div>
      <progress value={fractionLeft(seconds, initialSeconds)}/>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <CountdownTimer initialSeconds={30} start={Moment(Date.now()).format('hh:mm:ss')} />
    </>
  )
}

export default App
