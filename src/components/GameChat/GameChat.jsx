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
    const message = {
      player: state.player,
      text: input,
    };
    socket.emit('chat message', message);
    setInput('');
  };
   
  return (
    <div className='game-chat'>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} style={{ color: `#${msg.player.color}` }}>{msg.player.name}: {msg.text}</li>
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