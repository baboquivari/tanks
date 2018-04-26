import React from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function StatusBar (props) {
    const { handleStartGame, gameStart, players, gameStatus, currentPlayer } = props;

    return (
        <div>
            { updateStatus() }
            <button className="startBtn" onClick={handleStartGame}>Start Game</button>
        </div>
    )

    function updateStatus () {
        switch (gameStatus) {
            case 'positioning':
                return `Let's go, ${currentPlayer.name}! PICK A TILE TO MOVE TO`;
            case 'firing':
                return 'Now take your best shot, soldier!'
            default:
                return '';
        }
    }
}

export default StatusBar;