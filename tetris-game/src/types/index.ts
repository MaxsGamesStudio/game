export interface Piece {
    shape: number[][];
    position: { x: number; y: number };
    rotate(): void;
    move(direction: { x: number; y: number }): void;
}

export interface Board {
    grid: number[][];
    clearLines(): void;
    checkCollision(piece: Piece): boolean;
    draw(): void;
}

export interface Score {
    currentScore: number;
    updateScore(linesCleared: number): void;
    displayScore(): void;
}