import React, { Component } from 'react';

const PlayingField = (props) => {
    const { players, handleGridClick } = props;
    const gridSize = Math.pow(players.length + 1, 2);

    // if player array is 0, return empty div
    if (!players.length) return <div></div>

    return new Array(gridSize).fill('').map((ele, i) => {
        return (
            <div
                className="gridBox"
                key={i}
                onClick={handleGridClick.bind(null, i)}
            > {i+1}
            </div>
        )
    })

}

export default PlayingField;