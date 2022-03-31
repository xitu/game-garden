import { FUNC, WHITE, BLACK, xAxis, yAxis } from 'src/constant';
import isEqual from 'lodash/isEqual';

interface CellProps {
    col: number;
    row: number;
}
export const move = (board: string[][], startPos: CellProps, endPos: CellProps) => {
    const startPiece = board[startPos.row][startPos.col]
    if (isEqual(startPos, endPos)) {
        return board;
    }
    return board.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
            if (rowIndex === endPos.row && colIndex === endPos.col) {
                return startPiece;
            } if (rowIndex === startPos.row && colIndex === startPos.col) {
                return FUNC.blank;
            } else {
                return col;
            }
        })
    })
}

interface PieceProps {
    type: string;
    color: string;
}

export const toPiece = (piece: PieceProps | null) => {
    if(piece === null) {
        return FUNC.blank;
    }
    if (piece.color === 'w') {
        switch (piece.type) {
            case 'p':
                return WHITE.pawn;
            case 'r':
                return WHITE.rock;
            case 'n':
                return WHITE.knight;
            case 'b':
                return WHITE.bishop;
            case 'q':
                return WHITE.queen;
            case 'k':
                return WHITE.king;
            default:
                return WHITE.pawn;
        }
    }
    if (piece.color === 'b') {
        switch (piece.type) {
            case 'p':
                return BLACK.pawn;
            case 'r':
                return BLACK.rock;
            case 'n':
                return BLACK.knight;
            case 'b':
                return BLACK.bishop;
            case 'q':
                return BLACK.queen;
            case 'k':
                return BLACK.king;
            default:
                return BLACK.pawn;
        }
    }
}


export const toPieceImg = (piece: PieceProps | null) => {
    if(piece === null) {
        return FUNC.blank;
    }
    if (piece.color === 'w') {
        switch (piece.type) {
            case 'p':
                return WHITE.pawn_img;
            case 'r':
                return WHITE.rock_img;
            case 'n':
                return WHITE.knight_img;
            case 'b':
                return WHITE.bishop_img;
            case 'q':
                return WHITE.queen_img;
            case 'k':
                return WHITE.king_img;
            default:
                return WHITE.pawn_img;
        }
    }
    if (piece.color === 'b') {
        switch (piece.type) {
            case 'p':
                return BLACK.pawn_img;
            case 'r':
                return BLACK.rock_img;
            case 'n':
                return BLACK.knight_img;
            case 'b':
                return BLACK.bishop_img;
            case 'q':
                return BLACK.queen_img;
            case 'k':
                return BLACK.king_img;
            default:
                return BLACK.pawn_img;
        }
    }
}
export const getGridAxis = (cell: CellProps) => {
    const { col, row } = cell;
    return `${xAxis[col].toLowerCase()}${yAxis[row]}`
}
