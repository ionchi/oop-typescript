import { Game } from '../Game';

export interface Command {
  execute(game: Game): void;
  setParameter(param: string): void;
  getParameter(): string;
  getName(): string;
}
