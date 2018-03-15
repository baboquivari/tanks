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
    }

    render () {
        return (
            <div className="scoreboard">
                <Board />
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
}

export default Scoreboard;