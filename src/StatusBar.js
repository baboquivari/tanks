import React from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function StatusBar (props) {
    const { handleStartGame, gameStart, players, gameStatus } = props;
    const currentPlayer = gameStart ? players[0] : null;

    return (
        <div>
            { updateStatus() }
            <button className="startBtn" onClick={handleStartGame}>Start Game</button>
            <button className="nextPlayerReadyButton">Next Player Ready?</button>
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