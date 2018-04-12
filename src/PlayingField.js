import React, { Component } from 'react';

const PlayingField = (props) => {
    const { players, handleGridClick, gameStart, currentGame, currentPlayer } = props;
    const gridSize = Math.pow(players.length + 1, 2);
    console.log(currentGame);
    console.log(currentPlayer);

    // if player array is 0, return empty div
    if (!players.length) return <div></div>

    return new Array(gridSize).fill('').map((ele, i) => {
        return (
            <div
                className="gridBox"
                style={{color: 'blue'}}
                key={i}
                onClick={handleGridClick.bind(null, i)}
            >
            {/* render current player's tank when it's their go, this logic will basically check to see if the game has started and if so, will render the tank according to the 'currentPos' property for the player which is nested inside the 'currentGame' property on the state  */}
            <p>{ gameStart && currentGame[currentPlayer.name].currentPos === i ? 'YOUR TANK' : null  }</p>
            </div>
        )
    })

}

export default PlayingField;