import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

import styles from '../styles/Chat.module.css';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const {search} = useLocation();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search])

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, [])

  const leftRoom = () => {};
  const handleChange = () => {};
  const handleSubmit = () => {};

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>
          {params.room}
        </div>
        <div className={styles.users}>
          0 users in room
        </div>
        <button className={styles.left} onClick={leftRoom}>
          Left room
        </button>
      </div>

      <div className={styles.messages}>
          {state.map(({message}, idx) => (
            <span key={idx} >{message}</span>))}
        </div>

        <form className={styles.form}>
          <div className={styles.input}>
            <input 
              type="text" 
              name='message' 
              value={message} 
              placeholder='Write message'
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <div className={styles.button}> 
            <input type='submit' onSubmit={handleSubmit} value="Send message" />
          </div>
        </form>
    </div>
  )
}

export default Chat