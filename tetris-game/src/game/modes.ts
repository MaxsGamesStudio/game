export class Modes {
    static classic = {
        name: "Classic",
        description: "The traditional Tetris game mode.",
        linesToClear: 10,
        speed: 1000,
    };

    static timed = {
        name: "Timed",
        description: "Clear as many lines as possible within a time limit.",
        timeLimit: 120, // in seconds
        speed: 800,
    };

    static endless = {
        name: "Endless",
        description: "Play until you can no longer place a piece.",
        speed: 600,
    };

    static custom = {
        name: "Custom",
        description: "Create your own game mode with specific rules.",
        linesToClear: 20,
        speed: 500,
    };

    static getAllModes() {
        return [this.classic, this.timed, this.endless, this.custom];
    }
}