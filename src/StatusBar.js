import React from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function StatusBar (props) {
    const { handleStartGame } = props;

    return (
        <div>
            Status Bar
            <button className="startBtn" onClick={handleStartGame}>Start Game</button>
        </div>
    )
}

export default StatusBar;