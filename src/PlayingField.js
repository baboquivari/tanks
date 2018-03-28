import React, { Component } from 'react';

const PlayingField = props => {
    const players = { props };

    return new Array(9).fill('').map((ele, i) => {
        return (
            <div className="gridBox" key={i}> {i+1} </div>
        )
    })


}

export default PlayingField;