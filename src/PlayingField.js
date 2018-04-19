import React, { Component } from 'react';

const PlayingField = (props) => {
    const { players, handlePlayerTurn, gameStart, gameStatus, currentPlayer, confirmPlayerAction } = props;
    const gridSize = Math.pow(players.length + 1, 2);

    // if player array is 0, return empty div
    if (!players.length || !gameStart) return <div></div>

    console.log(players);
    console.log(currentPlayer);

    return new Array(gridSize).fill('').map((ele, i) => {
        return (
            <div
                className="gridBox"
                style={{color: 'blue'}}
                key={i}
                onClick={handlePlayerTurn.bind(null, i, gameStatus)}
            >
                {/* render current player's tank when it's their go, this logic will basically check to see if the game has started and if so, will render the tank according to the 'currentPos' property for the player which is nested inside the 'currentGame' property on the state   */}
                {/* <p>{ players[currentPlayer].currentPos === i ? 'YOUR TANK' : null  }</p> */}

                {/* render targetTile locations */}
                {/* <p>{ players[currentPlayer].targetTile === i ? 'YOUR SHOT' : null  }</p> */}

                {/* <button onClick={confirmPlayerAction.bind(null, currentPlayer, players)}> */}
                    {/* { players[currentPlayer].currentPos === i && gameStatus === 'positioning' ? 'CONFIRM' : null  } */}
                {/* </button> */}

                {/* <button onClick={confirmPlayerAction.bind(null, currentPlayer, players)}> */}
                    {/* { players[currentPlayer].targetTile === i && gameStatus === 'firing' ? 'CONFIRM' : null  } */}
                {/* </button> */}

            </div>
        )
    })

}

export default PlayingField;