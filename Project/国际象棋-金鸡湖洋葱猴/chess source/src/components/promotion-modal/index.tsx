import React, { useContext } from 'react';
import { BoardContext } from 'src/context/board';
const PromotionModal = () => {
    const { chessboard, moves, promotion, setPromotion, setMoves, setStartPos } = useContext(BoardContext);
    const resetConds = () => {
        setPromotion(false);
        setMoves([]);
        setStartPos(undefined);
    }
    return <>
        <input className="modal-state" id="modal-promotion" type="checkbox" checked={promotion} onChange={() => { }}></input>
        <div className="modal">
            <label className="modal-bg" htmlFor="modal-promotion" ></label>
            <div className="modal-body">
                <label className="btn-close" htmlFor="modal-promotion" onClick={resetConds}>X</label>
                <h4 className="modal-title">Promotion!</h4>
                <h5 className="modal-subtitle">Choose your move!</h5>
                <div className="row">
                    {moves.map((move: string, idx: number) => {
                        return <div className="col" key={idx} >
                            <button className="btn-sm" onClick={() => {
                                chessboard.move(move)
                                resetConds();
                            }}>{move}</button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default PromotionModal;
