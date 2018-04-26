import React, { Component } from 'react';
import Board from './Board';
import AddPlayerForm from './AddPlayerForm';
import PlayingField from './PlayingField';
import StatusBar from './StatusBar';

class Scoreboard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            currentPlayer: null,
            players: [],
            formValue: '',
            gameStart: false,
            gameStatus: ''
        }

        this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
        this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handlePlayerTurn = this.handlePlayerTurn.bind(this);
        this.confirmPlayerAction = this.confirmPlayerAction.bind(this);
        this.getNextPlayer = this.getNextPlayer.bind(this);
        this.setCurrentPlayerTurn = this.setCurrentPlayerTurn.bind(this);
        this.resetTurnsTaken = this.resetTurnsTaken.bind(this);
    }

    render () {
        return (
			<div>
				<div className="scoreboard">
                    <div className="header">
                        <table className="stats">
                            <tbody>
                                <tr>
                                    <td>Players:</td>
                                    <td>{this.state.players.length}</td>
                                </tr>
                                <tr>
                                    <td>Total Kills:</td>
                                    <td>tbc</td>
                                </tr>
                            </tbody>
                        </table>
                        <h1>Scoreboard</h1>
                    </div>
					<Board
						players={this.state.players}
                        currentPlayer={this.state.players}
                        handleScoreUpdate={this.handleScoreUpdate}
                        handleRemovePlayer={this.handleRemovePlayer}
					/>
					<AddPlayerForm
						onPlayerSubmit={this.onPlayerSubmit}
						onFormInput={this.onFormInput}
						formValue={this.state.formValue}
					/>
				</div>
                <div className="statusbar">
                    <StatusBar
                        handleStartGame={this.handleStartGame}
                        gameStart={this.state.gameStart}
                        players={this.state.players}
                        gameStatus={this.state.gameStatus}
                        currentPlayer={this.state.currentPlayer}
                    />
                </div>
				<div className={`playingField pf-${this.state.players.length}`}>
					<PlayingField
                        players={this.state.players}
                        handlePlayerTurn={this.handlePlayerTurn}
                        gameStart={this.state.gameStart}
                        gameStatus={this.state.gameStatus}
                        currentPlayer={this.state.currentPlayer}
                        confirmPlayerAction={this.confirmPlayerAction}
					/>
				</div>
			</div>
        )
    }

    onFormInput (event) {
        this.setState({
            formValue: event.target.value
        })
    }

    onPlayerSubmit (event) {
        // this prevents page refresh, which is what the native HTML Button Element does by default
        event.preventDefault();

        let players = this.state.players;

        // players[(Math.random() * 100000).toFixed(0)].push({
        //     name: this.state.formValue,
        //     score: 0,
        //     turnTaken: false
        // });

        players.push({
            id: (Math.random() * 100000).toFixed(0),
            name: this.state.formValue,
            score: 0,
            turnTaken: true
        });

        this.setState({
            players: players,
            formValue: ''
        })

    }

    handleScoreUpdate (playerArrID, buttonType) {
		let updatedPlayers = this.state.players;

		buttonType === 'plus' ? updatedPlayers[playerArrID].score++ : updatedPlayers[playerArrID].score--;

        this.setState({
            players: updatedPlayers
        })

    }

    handleRemovePlayer (i) {
        const updatedPlayers = this.state.players.filter(function (player, index) {
            return index !== i;
        })

        this.setState({
            players: updatedPlayers
        })
    }

    handleStartGame () {
        // the filthiest lines in this program
        document.querySelector('.addPlayerForm').parentElement.removeChild(document.querySelector('.addPlayerForm'));
        document.querySelector('.startBtn').parentElement.removeChild(document.querySelector('.startBtn'));

        // remove all player buttons
        const playerButtons = document.querySelectorAll('.removePlayerButton');
        playerButtons.forEach(function (playerButton) {
            playerButton.parentElement.removeChild(playerButton)
        });

        let updateState = this.state;

        updateState.gameStart = true;
        updateState.currentPlayer = this.getNextPlayer();
        updateState.gameStatus = 'positioning';
        updateState.players.map((player, i) => {
            player.currentPos = i,
            player.targetTile = null
        });

        this.setState({
            gameStart: updateState.gameStart,
            currentPlayer: updateState.currentPlayer,
            gameStatus: updateState.gameStatus,
            players: updateState.players
        })
    }

    getNextPlayer() {
        const players = this.state.players;

        for (const player of players) {
            if (!player.turnTaken) {
                return player;
            }
        }

        this.resetTurnsTaken();

        return players[0];
    }

    handlePlayerTurn (i, gameStatus, event) {
        //  change currentPlayer pos in the state
        event.stopPropagation();

        let currentPlayer = this.state.currentPlayer;

        currentPlayer.currentPos = gameStatus === 'positioning' ? i : currentPlayer.currentPos;
        currentPlayer.targetTile = gameStatus === 'positioning' ? null : i;

        this.setState({
            currentPlayer: currentPlayer
        })
    }

    confirmPlayerAction (currentPlayer, players, gameStatus, event) {
        // this next line is quite cool. the button which fires 'confirmPlayerMove' is a CHILD of the button which handles 'handlePlayerTurn' (in the HTML). Due to event bubbling, whenever an event is triggered a child, it also 'bubbles up' to the parent, causing the parent to fire it's handler, passing in that event. (As if itself was just triggered). This cause a problem because every time we want to confirmPlayerMove, we are also inadvertently calling the handlePlayerTurn handler above, which overwrites the state that was just set in this handler. PHEW! So, in order to stop that bubbling behaviour, we call this native DOM API method.
        event.stopPropagation();

        if(gameStatus === 'positioning'){
            this.setState({ gameStatus: 'firing' });
        } else {
            this.setCurrentPlayerTurn(true);
            this.setState({
                gameStatus: 'positioning',
                currentPlayer: currentPlayer,
                currentPlayer: this.getNextPlayer(true)
            });

        }

        function findNextPlayer (prevState) {
            const playersArray = this.state.players;

            for (let i = 0; i < playersArray.length; i++) {
                if (!prevState.currentGame[playersArray[i].name].takenTurn) {
                    return playersArray[i];
                }
            }
        }


        // TODO: So by the time we get here, all players' targetTiles are NULL, which is fucking with my ability to see who's actually been hit. Find out where they're being set to NULL.
        function reset (prevState) {
            // loop through and reset all players 'takenTurn' and 'targetTile' properties to false and null respectively, then return 1st player in array to reset the round
            Object.keys(prevState.currentGame).forEach(key => {
                if (key !== 'gameStatus') {
                    console.log(prevState.currentGame);
                    prevState.currentGame[key].takenTurn = false;
                    prevState.currentGame[key].targetTile = null;
                }
            })

            return prevState.players[0]
        }
    }

    setCurrentPlayerTurn(turnTaken) {
        // set the current players turn taken to true
        // change current player to next player in array
        let currentPlayer = this.state.currentPlayer;
        let players = this.state.players;

        if(turnTaken){
            currentPlayer.turnTaken = true;
        } else {
            // end of round so reset players
            this.resetTurnsTaken();
        }

        this.setState({
            currentPlayer: this.getNextPlayer()
        })
    }

    resetTurnsTaken() {
        // resets all turns taken to false
        let players = this.state.players;

        for (let player of players) {
            player.turnTaken = false;
        }

        this.setState({
            players: players
        })
    }

    setCurrentPlayerTurn(turnTaken) {
        // set the current players turn taken to true
        // change current player to next player in array
        let currentPlayer = this.state.currentPlayer;
        let players = this.state.players;

        if(turnTaken){
            currentPlayer.turnTaken = true;
        } else {
            // end of round so reset players
            this.resetTurnsTaken();
        }

        this.setState({
            currentPlayer: this.getNextPlayer()
        })
    }

    resetTurnsTaken() {
        // resets all turns taken to false
        let players = this.state.players;

        for (let player of players) {
            player.turnTaken = false;
        }

        this.setState({
            players: players
        })
    }
}

export default Scoreboard;