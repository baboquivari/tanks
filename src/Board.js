import React, { Component } from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function Board (props) {
    const players = props.players;

    return players.map(function (player) {
        return (
            <div> { player.name } </div>
        )
    })
}

export default Board;