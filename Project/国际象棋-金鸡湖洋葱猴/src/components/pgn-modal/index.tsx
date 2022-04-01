import React, { useContext } from 'react';
import { BoardContext } from 'src/context/board';
// rnbqkbnr/p2p1Qpp/1p6/2p1p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4
const PGNModal = () => {
    const { isGameOver, chessboard, resetChessboard } = useContext(BoardContext);
    return <>
        <input className="modal-state" id="modal-pgn" type="checkbox" checked={isGameOver} onChange={resetChessboard} />
        <div className="modal">
            <label className="modal-bg" htmlFor="modal-pgn" ></label>
            <div className="modal-body container container-sm">
                <label className="btn-close" htmlFor="modal-pgn">X</label>
                <h3 className='modal-title'>PGN</h3>
                <pre>
                    <code>
                        {chessboard.pgn()}
                    </code>
                </pre>
            </div>
        </div>
    </>
}

export default PGNModal;
