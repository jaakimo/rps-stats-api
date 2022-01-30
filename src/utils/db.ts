import axios from 'axios';
import { getRepository } from 'typeorm';
import { Result } from '../entity/result.entity';

import { GameResultFromApi } from '../types';
import { errorLogger, logger } from './loggers';

export const addResult = async (result: GameResultFromApi) => {
  return getRepository(Result).save(result);
};

export const initDb = async () => {
  try {
    const response = await axios.get(
      'https://bad-api-assignment.reaktor.com/rps/history',
    );

    const history = response.data.data;

    history.forEach(async (result: GameResultFromApi) => {
      try {
        addResult(result);
      } catch (e) {
        errorLogger(e);
      }
    });
  } catch (e) {
    errorLogger(e);
  }
  logger('history updated');
};
