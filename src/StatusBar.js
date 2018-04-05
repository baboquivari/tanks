import React, { Component } from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function StatusBar (props) {
    const { handleStartGame } = props;

    return (
        <div className="StatusBar">
            STATUSBAR
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    )
}

export default StatusBar;