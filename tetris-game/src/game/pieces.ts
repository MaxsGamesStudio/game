class Piece {
    constructor(public shape: number[][], public position: { x: number; y: number }) {}

    rotate() {
        this.shape = this.shape[0].map((_, index) => this.shape.map(row => row[index]).reverse());
    }

    move(direction: { x: number; y: number }) {
        this.position.x += direction.x;
        this.position.y += direction.y;
    }
}

export default Piece;