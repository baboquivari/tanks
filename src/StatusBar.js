import React from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function StatusBar (props) {
    const { handleStartGame, gameStart, players } = props;
    const currentPlayer = gameStart ? players[0] : null;


    return (
        <div>
            {currentPlayer ? `Let's go, ${currentPlayer.name}! PICK A TILE TO MOVE TO` : 'STATUS BAR' }
            <button className="startBtn" onClick={handleStartGame}>Start Game</button>
        </div>
    )
}

export default StatusBar;