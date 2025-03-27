import React, { useState } from 'react';
import '../App.css';


const Collapsible = (props) => {
    const { timersStore, setTimersStore, setHistory} = props;
    const [expandedCategories, setExpandedCategories] = useState({});


    // Toggle category expansion
    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Group timers by category
    const groupedTimers = timersStore.reduce((acc, timer) => {
        if (!acc[timer.category]) {
            acc[timer.category] = [];
        }
        acc[timer.category].push(timer);
        return acc;
    }, {});

    // Start all + Pause all + Clear all timers in a category
    const startAllInCategory = (category) => {
        setTimersStore(timersStore.map(timer =>
            timer.category === category && timer.status !== 'Running'
                ? {
                    ...timer,
                    status: 'Running',
                    intervalId: setInterval(() => {
                        setTimersStore(prevTimers => prevTimers.map(t => {
                            if (t.id === timer.id) {
                                if (t.remainingTime <= 0) {
                                    clearInterval(t.intervalId);
                                    const completedTimer = {
                                        ...t,
                                        status: 'Completed',
                                        completedAt: new Date()
                                    };
                                    setHistory(prev => {
                                        return [...prev.filter(item => item.id !== completedTimer.id), completedTimer];
                                    });
                                    return completedTimer;
                                }
                                return { ...t, remainingTime: t.remainingTime - 1 };
                            }
                            return t;
                        }));
                    }, 1000)
                }
                : timer
        ));
    };

    const pauseAllInCategory = (category) => {
        setTimersStore(timersStore.map(timer =>
            timer.category === category && timer.status === 'Running'
                ? {
                    ...timer,
                    status: 'Paused',
                    intervalId: timer.intervalId ? clearInterval(timer.intervalId) : undefined
                }
                : timer
        ));
    };

    const clearAllInCategory = (category) => {
        setTimersStore(timersStore.map(timer =>
            timer.category === category
                ? {
                    ...timer,
                    remainingTime: timer.duration,
                    status: 'Paused',
                    intervalId: timer.intervalId ? clearInterval(timer.intervalId) : undefined
                }
                : timer
        ));
    };

    // Start + Pause + Clear timers in a category
    const startTimer = (id) => {
        setTimersStore(timersStore.map(timer =>
            timer.id === id
                ? {
                    ...timer,
                    status: 'Running',
                    intervalId: setInterval(() => {
                        setTimersStore(prevTimers => prevTimers.map(t => {
                            if (t.id === id) {
                                if (t.remainingTime <= 0) {
                                    clearInterval(t.intervalId);
                                    const completedTimer = {
                                        ...t,
                                        status: 'Completed',
                                        completedAt: new Date()
                                    };
                                    setHistory(prev => {
                                        return [...prev.filter(item => item.id !== completedTimer.id), completedTimer];
                                    });
                                    return completedTimer;
                                }
                                return { ...t, remainingTime: t.remainingTime - 1 };
                            }
                            return t;
                        }));
                    }, 1000)
                }
                : timer
        ));
    };

    const pauseTimer = (id) => {
        setTimersStore(timersStore.map(timer =>
            timer.id === id
                ? {
                    ...timer,
                    status: 'Paused',
                    intervalId: timer.intervalId ? clearInterval(timer.intervalId) : undefined
                }
                : timer
        ));
    };

    const resetTimer = (id) => {
        setTimersStore(timersStore.map(timer =>
            timer.id === id
                ? {
                    ...timer,
                    remainingTime: timer.duration,
                    status: 'Paused',
                    intervalId: timer.intervalId ? clearInterval(timer.intervalId) : undefined
                }
                : timer
        ));
    };

    return (
        <>
            <h4 className="timer-titles">Timer Management</h4>
            <div className="collapsible-container">
                {Object.entries(groupedTimers).map(([category, categoryTimers]) => (
                    <div key={category} className="category-section">
                        <div
                            className="category-header"
                            onClick={() => toggleCategory(category)}
                        >
                            <div className="category-info">
                                <span className="expand-icon">
                                    {expandedCategories[category] ? '▼' : '►'}
                                </span>
                                <h4 className="category-name">{category}</h4>
                                <span className="timer-count">({categoryTimers.length} timers)</span>
                            </div>
                            <div className="category-actions">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startAllInCategory(category);
                                    }}
                                    className="btn btn-start"
                                >
                                    Start All
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        pauseAllInCategory(category);
                                    }}
                                    className="btn btn-pause"
                                >
                                    Pause All
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearAllInCategory(category);
                                    }}
                                    className="btn btn-reset"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        <div className={`timer-list ${expandedCategories[category] ? 'expanded' : 'collapsed'}`}>
                            {categoryTimers.map(timer => (
                                <div key={timer.id} className="timer-item">
                                    <div className="timer-details">
                                        <div className="timer-header">
                                            <h4 className="timer-name">{timer.name}</h4>
                                            <span className={`timer-status ${timer.status.toLowerCase()}`}>
                                                {timer.status}
                                            </span>
                                        </div>

                                        <div className="timer-progress">
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${((timer.duration - timer.remainingTime) / timer.duration) * 100}%`}}
                                            />
                                        </div>

                                        <div className="timer-info">
                                            <span>Remaining: {timer.remainingTime}s</span>
                                            <span>
                                                {(((timer.duration - timer.remainingTime) / timer.duration) * 100 ).toFixed(0)}% Complete
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timer-actions">
                                        <button
                                            onClick={() => startTimer(timer.id)}
                                            disabled={timer.status === 'Running' || timer.status === 'Completed'}
                                            className="btn btn-start"
                                        >
                                            Start
                                        </button>
                                        <button
                                            onClick={() => pauseTimer(timer.id)}
                                            disabled={timer.status !== 'Running'}
                                            className="btn btn-pause"
                                        >
                                            Pause
                                        </button>
                                        <button
                                            onClick={() => resetTimer(timer.id)}
                                            disabled={timer.status === 'Completed'}
                                            className="btn btn-reset"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Collapsible;