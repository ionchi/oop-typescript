import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME } from '../utils/static-data';

export default class LookCommand implements Command {
  private readonly name = COMMAND_NAME.look;
  public execute(game: Game): void {
    console.log(game.getCurrentRoom().getDescription());
    console.log(game.getPlayer().getDescription());
    console.log(game.getPlayer().getBackpack().getDescription());
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
