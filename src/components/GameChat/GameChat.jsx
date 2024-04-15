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
    const playersName = state.playersName;
    const msg = { playersName, text: input };
    const room = state.selectedRoom;
    console.log(msg)
    socket.emit('chat message', msg, room);
    setInput('');
  };
   
  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.playersName.player}: {msg.text}</li>
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