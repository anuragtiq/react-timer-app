import React from 'react'
import '../App.css'

const Timer = (props) => {
    const { newTimer, setNewTimer, timersStore, setTimersStore, setAtleastOne } = props;

    //Addition of new Timer
    const handleAddTimer = () => {
        if (!newTimer.name || !newTimer.duration || !newTimer.category) {
            alert('Please fill all fields');
            return;
        }

        const timerToAdd = {
            ...newTimer,
            id: Date.now(),
            duration: parseInt(newTimer.duration),
            remainingTime: parseInt(newTimer.duration),
            status: 'Paused'
        };

        setTimersStore([...timersStore, timerToAdd]);
        setNewTimer({ name: '', duration: '', category: '' });
        setAtleastOne(true);
    };

    return (
        <>
        <h3 className='timer-titles'>
            Add Timer
        </h3>
        <div className="timer-form">
            <input
                type="text"
                placeholder="Timer Name"
                value={newTimer.name}
                onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Duration (seconds)"
                value={newTimer.duration}
                onChange={(e) => setNewTimer({ ...newTimer, duration: e.target.value })}
            />
            <input
                type="text"
                placeholder="Category"
                value={newTimer.category}
                onChange={(e) => setNewTimer({ ...newTimer, category: e.target.value })}
            />
            <button className="timer-form-submit" onClick={handleAddTimer}>Add Timer</button>
        </div>
        </>
    )
}

export default Timer