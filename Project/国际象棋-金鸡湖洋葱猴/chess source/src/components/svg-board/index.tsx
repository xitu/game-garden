import React, { useContext } from 'react';
import { ThemeContext } from 'src/context/theme';
import {
    grid,
} from 'src/constant';
import { BoardContext } from 'src/context/board';
const SvgBoard = () => {
    const {
        theme: {
            gridSize,
            borderColor,
            blackGrid,
            whiteGrid,
            fontSize,
            blackPieceColor,
        } 
    } = useContext(ThemeContext);
    const { chessboard } = useContext(BoardContext);
    return <div className='svg-board'>
        <svg width={8 * gridSize} height={8 * gridSize} stroke={borderColor}>
            {grid.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                    return <g
                        width={gridSize}
                        height={gridSize}
                        key={`${rowIndex}-${colIndex}`}
                    >
                        <rect
                            x={colIndex * gridSize}
                            y={rowIndex * gridSize}
                            width={gridSize}
                            height={gridSize}
                            style={{ fill: col === 1 ? blackGrid : whiteGrid }}
                        />
                        <text
                            x={gridSize / 2 + gridSize * colIndex}
                            y={gridSize / 2 + gridSize * rowIndex}
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize={fontSize}
                            stroke={blackPieceColor}
                            opacity={0.8}
                        >
                            {chessboard[rowIndex][colIndex]}
                        </text>
                    </g>

                })
            })}
        </svg>
    </div>
}

export default SvgBoard;