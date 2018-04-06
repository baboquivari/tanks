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
            gameStart: false
        }

        this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
        this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
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
                    />
                </div>
				<div className={`playingField pf-${this.state.players.length}`}>
					<PlayingField
                        players={this.state.players}
                        numOfPlayers={this.state.players.length}
                        gameStart={this.state.gameStart}
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
        // the filthiest line in this program
        document.querySelector('.addPlayerForm').parentElement.removeChild(document.querySelector('.addPlayerForm'));
        document.querySelector('.startBtn').parentElement.removeChild(document.querySelector('.startBtn'));

        const playerButtons = document.querySelectorAll('.removePlayerButton');
        // remove all player buttons
        playerButtons.forEach(function (playerButton) {
            playerButton.parentElement.removeChild(playerButton)
        });


    }
}

export default Scoreboard;