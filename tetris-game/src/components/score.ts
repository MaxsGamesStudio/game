import React from 'react';

interface ScoreProps {
    score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
    return (
        <div className="score">
            <h2>Score: {score}</h2>
        </div>
    );
};

export default Score;