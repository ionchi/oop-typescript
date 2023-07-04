import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME } from '../utils/static-data';
import { log } from '../utils/basic-loader';

export default class LookCommand implements Command {
  private readonly name = COMMAND_NAME.look;
  public execute(game: Game): void {
    log.info(game.getCurrentRoom().getDescription());
    log.info(game.getPlayer().getDescription());
    log.info(game.getPlayer().getBackpack().getDescription());
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
