import '../css/notificationmessage.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const NotificationMessage = (props) => {

    const [width, setWidth] = useState(0);
    const [exit, setExit] = useState(false);
    const [intervalID, setIntervalID] = useState(null);
    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5;
                }
                clearInterval(id);
                return prev;
            })
           
            // setWidth(width +1);
        }, 40 );
        setInterval(id);
    };
    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type:"REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    }
    const handlePauseTimer = () => {
        clearInterval(intervalID);
    }
    useEffect(() => {
        if (width === 100) {
            handleCloseNotification();
        }

    }, [width])
    useEffect(() => {
        handleStartTimer();
    }, [])
    return (
        <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item ${props.type === 'success' ? 'Success' : 'Error'} ${exit ? "exit" : "continue"}`}  >
            
            {/* <button onClick={() => setExit(true)}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button> */}
            <div className="box-notification-message">
                <p className="text-message">{props.message}</p>
                <button className="btn-close-notification-message" onClick={() => setExit(true)}> <FontAwesomeIcon icon={faXmark} color="black" /></button>
            </div>
            <div className="bar" style={{ width: `${width}%` }}>
            </div>
        </div>
    )
}
export default NotificationMessage;