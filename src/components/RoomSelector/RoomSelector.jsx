import { useState } from 'react';
import { useGameContext } from '../../contexts/gameContext';
import { Button } from '../Button/SubmitButton.jsx';
import { socket } from '../../socket.js';

function roomSelector() {
  const { state, dispatch } = useGameContext();
  const [selectedRoom, setSelectedRoom] = useState('');
  const rooms = ['room 1', 'room 2', 'room 3'];

  const handleStart = () => {
    socket.emit('create room', selectedRoom);
  };
  const handleSelect = () => {
    socket.emit('join room', selectedRoom);
  };

  const handleRoomSelect = (room) => {
    console.log('room selected: ', room);
    setSelectedRoom(room);
    console.log('selectedRoom: ', selectedRoom);
    //socket.emit('join room', room);
  };

  return (
    <div className="container">
      <select value={state.selectedRoom} onChange={(e) => handleRoomSelect(e.target.value)}>
        <option value="">Select a room</option>
        {rooms.map((room) => (
          <option key={room} value={room}>{room}</option>
        ))}
      </select>
      <Button
        onClick={handleStart}
        text="Start Game"
        >
      </Button>
      <Button
        onClick={handleSelect}
        text="Select Room"
      ></Button>
  </div>
  );
}
export default roomSelector;