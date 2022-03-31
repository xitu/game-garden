import React, { useContext } from 'react';
import { BoardContext } from 'src/context/board';
import { ThemeContext } from 'src/context/theme';
import { useDrop, useDrag } from 'react-dnd';
import { DragDropType } from 'src/constant';
import { getGridAxis, toPieceImg } from 'src/operations/index';

interface PieceProps {
    item: any;
    rowIndex: number;
    colIndex: number;
    gridAxis: string;
}

const Piece = ({
    colIndex,
    rowIndex,
    item,
    gridAxis,
}: PieceProps) => {
    const { markedMoves, setStartPos } = useContext(BoardContext);

    const [, drag] = useDrag(
        () => ({
            type: DragDropType,
            item() {
                const from = { row: rowIndex, col: colIndex }
                setStartPos(from)

                return {
                    id: item.type,
                }
            },
            collect: (monitor) => {
                return {
                    isDragging: !!monitor.isDragging(),
                }
            },
        }),
        [],
    )

    if (!item) {
        return <span className={markedMoves.includes(gridAxis) ? 'mark' : ''} />;
    }

    return <img className="no-border" src={toPieceImg(item)} alt="" ref={drag} />
}

const Cell = ({
    item,
    rowIndex,
    colIndex,
    gridAxis,
}: PieceProps) => {
    const { theme: { blackPieceColor, blackGrid, whiteGrid, fontSize } } = useContext(ThemeContext);
    const { startPos, setStartPos, chessboard, setPromotion, setMoves, markedMoves } = useContext(BoardContext);

    const [, drop] = useDrop(
        () => ({
            accept: DragDropType,
            drop: () => {
                const from = getGridAxis(startPos as any)
                const to = gridAxis
                chessboard.move({ from, to })
                setStartPos(undefined)
            },
            canDrop: () => markedMoves.includes(gridAxis),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [markedMoves]
    )

    let backgroundColor = blackGrid;
    if (rowIndex % 2 === 0 && colIndex % 2 === 0) {
        backgroundColor = whiteGrid
    }
    if (rowIndex % 2 !== 0 && colIndex % 2 !== 0) {
        backgroundColor = whiteGrid
    }
    return <div
        ref={drop}
        className='cell'
        style={{
            color: blackPieceColor,
            backgroundColor: backgroundColor,
            fontSize: fontSize,
        }}
        onClick={() => {
            if (startPos === undefined) {
                const from = { row: rowIndex, col: colIndex }
                setStartPos(from)
                const availableMoves = chessboard.moves({ from })
                const promotionMoves = availableMoves.filter((i: string) => i.includes('='));
                if (promotionMoves.length > 0) {
                    setPromotion(true);
                    setMoves(promotionMoves);
                }
            } else {
                const from = getGridAxis(startPos)
                const to = gridAxis
                chessboard.move({ from, to })
                setStartPos(undefined)
            }
        }}
    >
        <Piece item={item} gridAxis={gridAxis} rowIndex={rowIndex} colIndex={colIndex} />
    </div>
};

export default Cell;