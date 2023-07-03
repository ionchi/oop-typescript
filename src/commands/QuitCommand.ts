import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';

export default class QuitCommand implements Command {
  public readonly name = COMMAND_NAME.quit;
  public execute(game: Game): void {
    console.log(TEXT_MESSAGE.thanksForPlaying);
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
