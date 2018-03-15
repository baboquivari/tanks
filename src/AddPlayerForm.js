import React, { Component } from 'react';

// STATELESS COMPONENT, child of Scoreboard.js
function AddPlayerForm (props) {
    return (
        <div className="addPlayerForm">
            <form>
                <input 
                    type="text"
                    value={props.formValue}
                    onChange={props.onFormInput}
                ></input>
                <button 
                    type="submit"
                    onClick={props.onPlayerSubmit}
                >Add Player
                </button>
            </form>
        </div>
    )
}

export default AddPlayerForm;