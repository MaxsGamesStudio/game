class Board {
    private grid: number[][];
    private rows: number;
    private cols: number;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createEmptyBoard();
    }

    private createEmptyBoard(): number[][] {
        return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    }

    public drawBoard(ctx: CanvasRenderingContext2D): void {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                ctx.fillStyle = this.grid[r][c] ? 'blue' : 'white';
                ctx.fillRect(c * 30, r * 30, 30, 30);
                ctx.strokeRect(c * 30, r * 30, 30, 30);
            }
        }
    }

    public clearLines(): number {
        let linesCleared = 0;
        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.grid[r].every(cell => cell !== 0)) {
                this.grid.splice(r, 1);
                this.grid.unshift(Array(this.cols).fill(0));
                linesCleared++;
                r++; // Check the same row again
            }
        }
        return linesCleared;
    }

    public checkCollision(piece: any, offsetX: number, offsetY: number): boolean {
        for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
                if (piece.shape[r][c] !== 0) {
                    const newX = c + piece.x + offsetX;
                    const newY = r + piece.y + offsetY;
                    if (newX < 0 || newX >= this.cols || newY >= this.rows || this.grid[newY][newX] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public placePiece(piece: any): void {
        for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
                if (piece.shape[r][c] !== 0) {
                    this.grid[r + piece.y][c + piece.x] = piece.shape[r][c];
                }
            }
        }
    }
}