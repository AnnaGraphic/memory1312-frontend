import './GameChat.css'
import { useState, useEffect } from 'react';
import { socket } from '../../socket.js';
import { useGameContext } from '../../contexts/gameContext';

function GameChat() {
  const { state, dispatch } = useGameContext();
  const [ input, setInput ] = useState('');
  const messages = state.messages;

  useEffect(() => {
    socket.on('chat message', (msg) => {
      dispatch({ type: 'NEW_MESSAGE', payload: msg })
    });

    return () => {
      socket.off('chat message');
    }
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', input);
    setInput('');
  };
   
  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default GameChat;