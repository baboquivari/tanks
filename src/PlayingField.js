import React, { Component } from 'react';

const PlayingField = props => {
    const { players, numOfPlayers, gameStart } = props;

    // if the game hasn't been started yet, don't render the grid
    if (!gameStart) return <div></div>;

    return new Array(calculateGridSize(numOfPlayers)).fill('').map((ele, i) => {
        return (
            <div className="gridBox" key={i} style={calculateGridProportions(numOfPlayers)}> {i+1} </div>
        )
    })

    // HELPER FUNCTIONS (COULD EASILY EXTRACT THESE OUT INTO A 'HELPERS' OR 'UTILITY' LIBRARY)

    function calculateGridSize (players) {
        switch (players) {
            case 2:
                return 9;
            break;
            case 3:
                return 25;
            break;
            case 4:
                return 50;
            break;
        }
    }

    function calculateGridProportions (players) {
        let proportion;

        switch (players) {
            case 2:
                proportion = '33%';
            break;
            case 3:
                proportion = '20%';
            break;
            case 4:
                proportion = '10%';
            break;
        }

        return {
            flex: `0 0 ${proportion}`
        }
    }


}

export default PlayingField;