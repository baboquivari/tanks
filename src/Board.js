import React, { Component } from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function Board (props) {
    const { players, handleScoreUpdate } = props;

    return players.map((player, i) => {
        return (
            <div className="playerInfo" key={i}>
                <span>{ player.name }</span>
                <span className="playerScoreButtons">
                    <button onClick={handleScoreUpdate.bind(null, i, 'minus')}>-</button>
                    <span> Score: { players[i].score } </span>
                    <button onClick={handleScoreUpdate.bind(null, i, 'plus')}>+</button>
                </span>
            </div>
        )
    })
}

export default Board;