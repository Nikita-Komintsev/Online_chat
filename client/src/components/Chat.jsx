import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const {search} = useLocation();
  const [params, setParams] = useState(null);
  const [state, setState] = useState([]);

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

  return (
    <div>Chat</div>
  )
}

export default Chat