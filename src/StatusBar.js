import React, { Component } from 'react';

function StatusBar (props) {
    return (
        <div>
            <p> STATUS </p>
            <button className="startGameButton" onClick={props.handleGameStart}>START GAME</button>
        </div>
    )
}

export default StatusBar;