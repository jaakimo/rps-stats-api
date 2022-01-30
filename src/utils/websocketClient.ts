import { GameResultFromApi } from '../types';
import WebSocket from 'ws';
import { errorLogger, logger } from './loggers';
import { addResult } from './db';
import { Result } from '../entity/result.entity';
import { validate } from 'class-validator';

const URI = 'wss://bad-api-assignment.reaktor.com/rps/live';

export const connectWS = () => {
  const socket = new WebSocket(URI);

  socket.onopen = () => {
    logger('websocket opened');
  };

  socket.onmessage = async (message) => {
    const gameData: GameResultFromApi = JSON.parse(
      JSON.parse(message.data as string),
    );
    if (gameData.type === 'GAME_RESULT') {
      const newResultObject = new Result(
        gameData.gameId,
        gameData.t,
        gameData.type,
        gameData.playerA,
        gameData.playerB,
      );
      // validate WS data
      const errors = await validate(newResultObject);
      if (errors.length > 0) {
        errorLogger('Error in webSocketClient -', errors);
      } else {
        const newResult = await addResult(newResultObject);
        logger('new result added with id', newResult.gameId);
      }
    }
  };

  socket.onerror = (e) => errorLogger(e.message);

  socket.onclose = (e) => {
    errorLogger('WS connection lost - ', e);
    setTimeout(connectWS, 30000);
  };
};
