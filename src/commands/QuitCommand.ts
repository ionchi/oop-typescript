import { Command } from './Command';
import { Game } from '../Game';

export class QuitCommand implements Command {
  public readonly name = 'quit';
  public execute(game: Game): void {
    console.log('🙏 Thanks for playing!');
    game.setGameOver();
  }

  public setParameter(): void {
    // Do nothing
  }

  public getParameter(): string {
    return '';
  }

  public getName(): string {
    return this.name;
  }
}
