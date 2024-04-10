import { useState, useEffect } from 'react';
import {socket} from '../../socket.js';

function GameChat() {
const [ messages, setMessages ] = useState([]);
const [ input, setInput ] = useState('');
const [ gameState, setGameState ] = useState(null);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log('messages', messages);
    });
  
    socket.on('game state', (state) => {
      setGameState(state);
    });
  }, []);

  const sendMessage = () => {
    console.log(input);
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