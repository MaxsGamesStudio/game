import React from 'react';

const Preview: React.FC<{ nextPiece: string }> = ({ nextPiece }) => {
    return (
        <div className="preview">
            <h2>Next Piece</h2>
            <div className={`piece ${nextPiece}`}></div>
        </div>
    );
};

export default Preview;