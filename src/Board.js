import React from 'react';
import "./App.css";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guess: ""
        }

        console.log(props);
    }

    render() {
        return (
            <div id="board">
                <table>
                    <tbody>
                        {
                            this.props.grid.map((row, index) => {
                                return (
                                    <tr key={"row"+index}>
                                        {
                                            row.map((letter, index) => {
                                                return (<td class="gridcell"><button onClick={() => this.chooseLetter(letter)}>{letter}</button></td>)
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button id="submitguess" onClick={() => {
                    this.props.submitGuessCallback(this.state.guess);
                    this.setState({
                        guess: ""
                    });
                }}>Submit "{this.state.guess}"</button>
            </div>
        );
    };

    chooseLetter(letter) {
        let guess = this.state.guess;

        this.setState({
            guess: guess + letter
        });
    }
}

export default Board;
