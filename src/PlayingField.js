import React, { Component } from 'react';

const PlayingField = (props) => {
    const { players, handlePlayerTurn, gameStart, gameStatus, currentPlayer, confirmPlayerAction } = props;
    const gridSize = Math.pow(players.length + 1, 2);

    // if player array is 0, return empty div
    if (!players.length || !gameStart) return <div></div>

    return new Array(gridSize).fill('').map((ele, i) => {
        return (
            <div
                className="gridBox"
                style={{color: 'blue'}}
                key={i}
                onClick={handlePlayerTurn.bind(null, i, gameStatus)}
            >
                {/* render current player's tank when it's their go, this logic will basically check to see if the game has started and if so, will render the tank according to the 'currentPos' property for the player which is nested inside the 'currentGame' property on the state     */}
                 <p>{ currentPlayer.currentPos === i ? 'YOUR TANK' : null  }</p> 

                {/* render targetTile locations */}
                 <p>{ currentPlayer.targetTile === i ? 'YOUR SHOT' : null  }</p> 

                
                 <button onClick={confirmPlayerAction.bind(null, currentPlayer, players, gameStatus)}> 
                     { currentPlayer.currentPos === i ? 'CONFIRM' : null  }
                     { currentPlayer.targetTile === i ? 'CONFIRM' : null  }
                 </button>

            </div>
        )
    })

}

export default PlayingField;