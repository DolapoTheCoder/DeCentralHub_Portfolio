import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4169e1;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

function Notification({ message }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <NotificationContainer show={show}>
            {message}
        </NotificationContainer>
    );
}

export default Notification;