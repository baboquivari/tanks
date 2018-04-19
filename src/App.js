import React, { Component } from 'react';
import Board from './Board';
import AddPlayerForm from './AddPlayerForm';
import PlayingField from './PlayingField';
import StatusBar from './StatusBar';

class Scoreboard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            currentPlayer: '',
            players: [],
            formValue: '',
            gameStart: false,
            currentGame: {}
        }

        this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
        this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handlePlayerTurn = this.handlePlayerTurn.bind(this);
        this.confirmPlayerAction = this.confirmPlayerAction.bind(this);
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
                        currentGame={this.state.currentGame}
                    />
                </div>
				<div className={`playingField pf-${this.state.players.length}`}>
					<PlayingField
                        players={this.state.players}
                        numOfPlayers={this.state.players.length}
                        handlePlayerTurn={this.handlePlayerTurn}
                        gameStart={this.state.gameStart}
                        currentGame={this.state.currentGame}
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

        this.setState({
            players: this.state.players.concat({
                name: this.state.formValue,
                score: 0,
                id: (Math.random() * 100000).toFixed(0)
            }),
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

        // update state, including adding a new CURRENTGAME prop to the state
        this.setState({
            gameStart: true,
            currentPlayer: this.state.players[0],
            currentGame: Object.assign({}, this.state.currentGame, this.state.players.reduce((acc, player, i) => {
                acc[player.name] = {
                    currentPos: Math.round(Math.random() * Math.pow(this.state.players.length + 1, 2)),
                    targetTile: null,
                    takenTurn: false
                }
                return acc;
            }, {}),
            {
                gameStatus: 'positioning'
            }
        )
        })
    }

    handlePlayerTurn (i, gameStatus, event) {
        //  change currentPlayer pos in the state
        this.setState({
            currentGame: Object.assign({}, this.state.currentGame, {
                [this.state.currentPlayer.name]: {
                    currentPos: gameStatus === 'positioning' ? i : this.state.currentGame[this.state.currentPlayer.name].currentPos,
                    targetTile: gameStatus === 'positioning' ? null : i,
                    takenTurn: this.state.currentGame[this.state.currentPlayer.name].takenTurn
                }
            })
        })
    }

    confirmPlayerAction (currentPlayer, currentGame, event) {
        // this next line is quite cool. the button which fires 'confirmPlayerMove' is a CHILD of the button which handles 'handlePlayerTurn' (in the HTML). Due to event bubbling, whenever an event is triggered on a child, it also 'bubbles up' to the parent, causing the parent to fire it's handler, passing in that event. (As if itself was just triggered). This cause a problem because every time we want to confirmPlayerMove, we are also inadvertently calling the handlePlayerTurn handler above, which overwrites the state that was just set in this handler. PHEW! So, in order to stop that bubbling behaviour, we call this native DOM API method.
        event.stopPropagation();

        console.log(currentGame);

        if (currentGame.gameStatus === 'positioning') {
            document.querySelector('.nextPlayerReadyButton').style.display = "none";

            this.setState(() => ({
                currentGame: Object.assign({}, currentGame, {
                    gameStatus: 'firing'
            })}))

        } else {

            this.setState((prevState) => ({
                currentGame: Object.assign({}, currentGame, {
                    gameStatus: 'positioning',
                    [currentPlayer]: Object.assign({}, currentGame[currentPlayer], {
                        takenTurn: !currentGame[currentPlayer].takenTurn
                    })
                })
            }))

            this.setState((prevState) => ({
                currentPlayer: findNextPlayer.call(this, prevState)
            }))

            document.querySelector('.nextPlayerReadyButton').style.display = "inline-block";
        }

        function findNextPlayer (prevState) {
            // loop through this.state.players ARRAY
            // check each player's TAKENTURN property. Stop and return the first one that is set to false.
            const playersArray = this.state.players;

            // you can see the asynchronicity at play here
            console.log(this.state);
            console.log(prevState);

            for (let i = 0; i < playersArray.length; i++) {
                if (!prevState.currentGame[playersArray[i].name].takenTurn) {
                    console.log(playersArray[i]);
                    return playersArray[i];
                }
            }
        }
    }
}

export default Scoreboard;