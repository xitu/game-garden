import BLACK_PAWN from 'src/assets/black-pawn.png';
import BLACK_ROCK from 'src/assets/black-rock.png';
import BLACK_KNIGHT from 'src/assets/black-knight.png';
import BLACK_BISHOP from 'src/assets/black-bishop.png';
import BLACK_QUEEN from 'src/assets/black-queen.png';
import BLACK_KING from 'src/assets/black-king.png';

import WHITE_PAWN from 'src/assets/white-pawn.png';
import WHITE_ROCK from 'src/assets/white-rock.png';
import WHITE_KNIGHT from 'src/assets/white-knight.png';
import WHITE_BISHOP from 'src/assets/white-bishop.png';
import WHITE_QUEEN from 'src/assets/white-queen.png';
import WHITE_KING from 'src/assets/white-king.png';
// default theme
export const defaultTheme = {
    borderColor: 'lightgrey',
    whiteGrid: '#fff',
    blackGrid: 'lightgrey',
    whitePieceColor: '#2b2b2b',
    blackPieceColor: '#2b2b2b',
    gridSize: 50,
    fontSize: 40,
}

export const woodenTheme = {
    borderColor: '#AD9278',
    whiteGrid: '#D1BF9D',
    blackGrid: '#AD9278',
    whitePieceColor: '#2b2b2b',
    blackPieceColor: '#2b2b2b',
    gridSize: 50,
    fontSize: 40,
}

// default board
export const grid = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];

export const yAxis = [8, 7, 6, 5, 4, 3, 2, 1];
export const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const WHITE = {
    pawn: '♙',
    rock: '♖',
    knight: '♘',
    bishop: '♗',
    queen: '♕',
    king: '♔',
    pawn_img: WHITE_PAWN,
    rock_img: WHITE_ROCK,
    knight_img: WHITE_KNIGHT,
    bishop_img: WHITE_BISHOP,
    queen_img: WHITE_QUEEN,
    king_img: WHITE_KING,
}

export const BLACK = {
    pawn: '♟',
    rock: '♜',
    knight: '♞',
    bishop: '♝',
    queen: '♛',
    king: '♚',
    pawn_img: BLACK_PAWN,
    rock_img: BLACK_ROCK,
    knight_img: BLACK_KNIGHT,
    bishop_img: BLACK_BISHOP,
    queen_img: BLACK_QUEEN,
    king_img: BLACK_KING,
}

export const FUNC = {
    blank: ''
}

export const initMap = [
    [BLACK.rock, BLACK.knight, BLACK.bishop, BLACK.queen, BLACK.king, BLACK.bishop, BLACK.knight, BLACK.rock],
    [BLACK.pawn, BLACK.pawn, BLACK.pawn, BLACK.pawn, BLACK.pawn, BLACK.pawn, BLACK.pawn, BLACK.pawn],
    [FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank,],
    [FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank,],
    [FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank,],
    [FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank, FUNC.blank,],
    [WHITE.pawn, WHITE.pawn, WHITE.pawn, WHITE.pawn, WHITE.pawn, WHITE.pawn, WHITE.pawn, WHITE.pawn],
    [WHITE.rock, WHITE.knight, WHITE.bishop, WHITE.queen, WHITE.king, WHITE.bishop, WHITE.knight, WHITE.rock],
];

export const DragDropType = 'chess'
