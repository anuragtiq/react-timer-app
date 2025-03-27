import React from 'react';
import '../App.css';

const History = ({ history }) => {
    // Sort history to show most recent timers first
    const sortedHistory = [...history].sort((a, b) =>
        new Date(b.completedAt) - new Date(a.completedAt)
    );

    return (
        <>
            <h4 className='timer-titles'>Timer History</h4>
            <div className='history-block'>
                <table className='history-table'>
                    <thead>
                        <tr>
                            <th>Timer Name</th>
                            <th>Category</th>
                            <th>Duration</th>
                            <th>Completed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedHistory.length > 0 ? (
                            sortedHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.duration} seconds</td>
                                    <td>
                                        {new Date(item.completedAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-history">
                                    No completed timers yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default History;