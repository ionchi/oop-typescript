import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { log } from '../utils/basic-logger';

export default class DropCommand implements Command {
  private item: string;
  private readonly name: string = COMMAND_NAME.drop;

  public execute(game: Game): void {
    const toolToDrop = game.getPlayer().getBackpack().getTools()
      .find((el) => el.getName() === this.item);
    if (!toolToDrop) {
      log.error(TEXT_MESSAGE.invalidTool);
      return;
    }
    game.getPlayer().getBackpack().removeTool(toolToDrop.getName());
    game.getCurrentRoom().addTool(toolToDrop);
    log.success(`ℹ️ You dropped ${toolToDrop.getDescription()}`);
  }

  public setParameter(param: string): void {
    this.item = param;
  }

  public getParameter(): string {
    return this.item;
  }

  public getName(): string {
    return this.name;
  }
}
