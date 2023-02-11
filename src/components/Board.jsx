import React, {useState, useEffect} from 'react'
import { Board } from "../helper";
import Cell from './Cell';
import Tile from './Tile';
import useEvent from './../hooks/useEvent';
import GameOverLayout from './GameOverLayout';

const BoardView = () => {
    const [board, setBoard] = useState(new Board());

    const handleKeyDown = (event) => {
        if (board.hasWon()) {
            return;
        }

        if (event.keyCode >= 37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);

        }
    };

    useEvent("keydown", handleKeyDown);

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex} col={col} />
                })}
            </div>
        )
    });

    const tiles = board.tiles.filter(tile => tile.value !== 0).map((tile, index) => {
        return <Tile key={index} tile={tile} />
    }) ;

    const resetGame = () => {
        setBoard(new Board());
    }; 

    return (
        <div>
            <div className="details-box">
                <div className="resetButton" onClick={resetGame}>New Game</div>
                <div className="score-box">
                    <div className="score-header">SCORE</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className="board">
                {cells}{tiles}
                <GameOverLayout onRestart={resetGame} board={board} />
            </div>

            <div className='creator'>© Karam Afandi - 2023</div>
        </div>
    )
}

export default BoardView
