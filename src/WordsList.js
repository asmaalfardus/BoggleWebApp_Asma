import React from 'react';
import "./App.css";

class WordsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div id="wordslist">
                <h2>
                    <u>Words to find</u>
                    <ul>
                        {
                            this.props.wordslist.map(word => {
                                let color = "#000000";

                                if (this.props.foundWords.includes(word)) {
                                    color = "#00EE00";
                                }

                                return (
                                    <li color={color}>{word}</li>
                                )
                            })
                        }
                    </ul>
                </h2>
            </div>
        );
    };
}

export default WordsList;