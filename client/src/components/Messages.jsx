import React from 'react';
import styles from '../styles/Messages.module.css';

const Messages = ({messages, name}) => {
  return (
    <div className={styles.Messages}>
        {messages.map(({user, message}, i) => {
            const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
            const className = itsMe ? styles.me : 
                (message.includes("has") || message.includes("in")) ? styles.info : styles.user;

            return(
                <div key={i} className={`${styles.message} ${className}`}>
                    <span className={styles.user}>
                        {user.name}
                    </span>
                    <div className={styles.text}>
                        {message}
                    </div>
                </div>
            )
        })}
    </div>
  );
};

export default Messages