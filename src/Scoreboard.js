import React, { Component } from 'react';
import Board from './Board';
import AddPlayerForm from './AddPlayerForm';

class Scoreboard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            currentPlayer: '',
            players: [],
            formValue: ''
        }

        this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
    }

    render () {
        return (
            <div className="scoreboard">
                <Board
                    players={this.state.players}
                    handleScoreUpdate={this.handleScoreUpdate}
                />
                <AddPlayerForm
                    onPlayerSubmit={this.onPlayerSubmit}
                    onFormInput={this.onFormInput}
                    formValue={this.state.formValue}
                />
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
                id: Math.random() * 10
            }),
            formValue: ''
        })
    }

    handleScoreUpdate (i, event) {
        const scoreUpdate = event.target.innerHTML;
        const playerIndex = i;

        const updatedPlayers = this.state.players.map((player, i) => {
            if (playerIndex === i) {
                scoreUpdate == '+' ?
                    player.score++ :
                    player.score !== 0 ? player.score-- : null;

                return player;
            }
            return player;
        })

        this.setState({
            players: updatedPlayers
        })

    }
}

export default Scoreboard;