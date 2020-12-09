import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";

//import findAllSolutions from './boggle_solver.js';
//import RandomGrid from './generateBoard.js';
import dictionary from "./dictionary.js";

function RandomGrid() {
  return [
    ['G','R','I','P','QU'],
    ['T','E','S','T','E'],
    ['H','A','T','N','U'],
    ['O','N','C','E','E'],
    ['W','E','N','C','H']
  ]
}

function findAllSolutions() {
  return [
    "GRIP", "QUEUE", "TEST", "HAT", "ONCE", "WENCH"
  ];
}

// Props are passed via HTML attributes, state is managed within the component privately //

class App extends React.Component {
  constructor(props) {
    super(props);

    let grid = RandomGrid();
    let solutions = findAllSolutions(dictionary, grid);

    this.state = {
      gameStarted: false,
      foundWords: [],
      solutions: solutions,
      grid: grid,
      guess: "",
      guessedCells: [],
      gameOver: false
    }
    
    for (let i = 0; i < this.state.solutions.length; i++) {
      console.log(this.state.solutions[i]);
    }
  }

  render() {
    return (
      <body>
        <div className="App">
          {!this.state.gameOver && <button onClick={() => {
            if (this.state.gameStarted) {
              this.setState({gameOver: true});
            } else {
              this.setState({gameStarted: true});
            }
          }}><h2>{
            (this.state.gameStarted && "STOP GAME") || "START GAME"
          }</h2></button>}

          {this.state.gameStarted && <div id="board">
            <table>
                <tbody>
                    {
                        this.state.grid.map((row, ri) => {
                            return (
                                <tr key={"row"+ri}>
                                    {
                                        row.map((letter, ci) => {
                                            return (<td class="gridcell"><button onClick={() => this.chooseLetter(ri, ci)}>{letter}</button></td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button id="submitguess" onClick={() => {
                this.submitGuess(this.state.guess);
                this.setState({
                    guess: ""
                });
            }}>Submit "{this.state.guess}"</button>
          </div>}
          
          {this.state.gameStarted && <div id="wordslist">
              <h2>
                  <u>{
                    (this.state.gameOver && "All words") || "Words you've found"
                  }</u>
                  <ul>
                      {
                          this.state.solutions.map(word => {
                              if (this.state.foundWords.includes(word)) {
                                return <li class="foundWord">{word}</li>
                              } else if (this.state.gameOver) {
                                return <li class="missedWord">{word}</li>
                              }

                              return null;
                          })
                      }
                  </ul>
              </h2>
          </div>}
        </div>

        <script src="/__/firebase/7.24.0/firebase-app.js"></script>
        <script src="/__/firebase/init.js"></script>
      </body>
    );
  }

  submitGuess(guess) {
    if (this.state.gameOver) return;
    console.log("Guess submitted: " + guess);
    this.setState({
      guessedCells: []
    });
    
    // Why is this printing the props of Board? We're inside of App not Board + "this" should contain the state object because we defined it on line 35 //
    if (this.state.foundWords.includes(guess)) {
      alert("You already found \"" + guess + "\"!");
      return;
    }
  
    for (let solution of this.state.solutions) {
      if (solution === guess) {
        alert("You found " + guess + "!");
        this.state.foundWords.push(guess);
        this.setState({
          foundWords: this.state.foundWords
        });
      }
    }
  }

  chooseLetter(row, col) {
    if (this.state.gameOver) return;

    let guessedCells = this.state.guessedCells;
    for (let cell of guessedCells) {
      if (cell.row === row && cell.col === col) {
        return;
      }
    }

    let lgc = guessedCells[guessedCells.length - 1];
    if (lgc == null || (Math.abs(lgc.row - row) <= 1 && Math.abs(lgc.col - col) <= 1)) {
      let letter = this.state.grid[row][col];
      let guess = this.state.guess;

      guessedCells.push({
        row: row,
        col: col
      });

      this.setState({
          guess: guess + letter,
          guessedCells: guessedCells
      });
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
