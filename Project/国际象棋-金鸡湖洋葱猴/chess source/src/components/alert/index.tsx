import React from 'react';
import { AlertContext } from 'src/context/alert/index';
import './style.scss';

const Alert = () => {
    const { text, clear, show } = React.useContext(AlertContext);
    return show ? <>
        <div className="col fixed-alert" onClick={clear}>
            <span className="alert alert-primary">
                {text}
            </span>
        </div>
    </> : <></>
}

export default Alert;