export class Score {
    private score: number;
    private highScore: number;

    constructor() {
        this.score = 0;
        this.highScore = 0;
    }

    public increaseScore(points: number): void {
        this.score += points;
        this.updateHighScore();
    }

    private updateHighScore(): void {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    public resetScore(): void {
        this.score = 0;
    }

    public getScore(): number {
        return this.score;
    }

    public getHighScore(): number {
        return this.highScore;
    }

    public displayScore(): string {
        return `Score: ${this.score} | High Score: ${this.highScore}`;
    }
}