import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../entity/result.entity';
import { errorLogger } from '../utils/loggers';

export const getResults = async (req: Request, res: Response) => {
  try {
    const results = await getRepository(Result).find({
      where: { type: 'GAME_RESULT' },
    });
    return res.status(200).send(results);
  } catch (e) {
    errorLogger(e, req.url);
  }
};
