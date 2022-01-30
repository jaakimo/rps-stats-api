export interface GameResultFromApi {
  gameId: string;
  t: number;
  type: string;
  playerA: { name: string; played: 'ROCK' | 'PAPER' | 'SCISSORS' };
  playerB: { name: string; played: 'ROCK' | 'PAPER' | 'SCISSORS' };
}
