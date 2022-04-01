import React, { useContext } from 'react';
import { BoardContext } from 'src/context/board';
import chunk from 'lodash/chunk';
import djs from 'dayjs';
import { toPiece } from 'src/operations';

const ChessManual = () => {
    const { chessboard } = useContext(BoardContext);
    const history: any[] = chunk(chessboard.history({ verbose: true }), 2);
    return <article className='article'>
        <h4 className=''>Chess Manual</h4>
        <p className="article-meta">Created At {djs().format('YYYY-MM-DD')}</p>
        <div className="row">
            <div className="col-12 padding-none">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Notation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map(([first, second], idx: number) => {
                            return <tr key={idx}>
                                <td>{idx}</td>
                                <td>{first ? `${toPiece({ color: first.color, type: first.piece })} from ${first.from} to ${first.to}` : ``}</td>
                                <td>{second ? `${toPiece({ color: second.color, type: second.piece })} from ${second.from} to ${second.to}` : ``}</td>
                                <td>{first?.san} {second?.san}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-12">
                <pre>
                    <code>
                        {chessboard.fen()}
                    </code>
                </pre>
            </div>
        </div>

    </article>
};

export default ChessManual;
