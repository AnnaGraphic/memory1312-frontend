import { useEffect } from 'react';
import { socket } from '../socket';

export const useGameLogic = (state, dispatch) => {
  useEffect(() => {
    const handleDispatchEvent = (action) => {
      console.log(action);
      socket.emit('game_action', action);
    };
    // register dispatch-event-handler
    const handleRemoteDispatchEvent = (action) => {
      dispatch(action);
    };

    // subscribe to dispatch events from server
    socket.on('game_action', handleRemoteDispatchEvent);

    return () => {
      socket.off('game_action', handleRemoteDispatchEvent);
    };
  }, [dispatch]);};