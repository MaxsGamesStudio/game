// src/app.ts

import { Board } from './game/board';
import { Piece } from './game/pieces';
import { Score } from './game/score';
import { Modes } from './game/modes';

class TetrisGame {
    private board: Board;
    private score: Score;
    private currentPiece: Piece;
    private gameLoop: any;
    private mode: Modes;

    constructor() {
        this.board = new Board();
        this.score = new Score();
        this.mode = new Modes();
        this.init();
    }

    private init() {
        this.spawnPiece();
        this.startGameLoop();
        this.handleUserInput();
    }

    private spawnPiece() {
        this.currentPiece = new Piece();
        // Logic to place the piece on the board
    }

    private startGameLoop() {
        this.gameLoop = setInterval(() => {
            this.update();
            this.render();
        }, 1000 / 60); // 60 FPS
    }

    private update() {
        // Logic to update game state
        this.board.update(this.currentPiece);
    }

    private render() {
        // Logic to render the game
        this.board.draw();
        this.score.display();
    }

    private handleUserInput() {
        document.addEventListener('keydown', (event) => {
            // Logic to handle user input
        });
    }
}

const game = new TetrisGame();