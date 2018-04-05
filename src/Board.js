import React, { Component } from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function Board (props) {
    const { players, handleScoreUpdate, handleRemovePlayer } = props;

    return players.map((player, i) => {
        return (
            <div className="playerInfo" key={i}>
                <span>{ player.name }</span>
                <span className="playerScoreButtons">
                    <button onClick={handleScoreUpdate.bind(null, i, 'minus')}>-</button>
                    <span> Score: { players[i].score } </span>
                    <button onClick={handleScoreUpdate.bind(null, i, 'plus')}>+</button>
                    <button className="removePlayerButton" onClick={handleRemovePlayer.bind(null, i)}> X </button>
                </span>
            </div>
        )
    })
}

export default Board;