import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './utils/Timer';
import Collapsible from './utils/collapsible';
import History from './utils/history'

const TimerApp = () => {
  const [timersStore, setTimersStore] = useState([]);
  const [history, setHistory] = useState([]);
  const [newTimer, setNewTimer] = useState({
    name: '',
    duration: '',
    category: ''
  });
  

  // 3 useEffect for Load timers and history from localStorage on initial load + Save timers changes + Save history changes
  useEffect(() => {
    const storedTimers = localStorage.getItem('timers');
    const storedHistory = localStorage.getItem('history');
    
    if (storedTimers) setTimersStore(JSON.parse(storedTimers));
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timersStore));
  }, [timersStore]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);


  return (
    <div className="timer-app">
      <h2 className='timer-app-header'>Timer Application</h2>
      <div className='timer-app-block'>
        <Timer
          newTimer={newTimer}
          setNewTimer={setNewTimer}
          timersStore={timersStore}
          setTimersStore={setTimersStore}
        />

        <Collapsible 
          timersStore={timersStore}
          setTimersStore={setTimersStore}
          setHistory={setHistory}
        />

        <History 
          history={history}
        />
      </div>
    </div>
  );
};

export default TimerApp;

