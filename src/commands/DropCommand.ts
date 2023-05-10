import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME, TEXT_MESSAGE } from '../static-data';

export default class DropCommand implements Command {
  private item: string;
  private readonly name: string = COMMAND_NAME.drop;

  public execute(game: Game): void {
    if (this.item) {
      const toolToDrop = game.getPlayer().getBackpack().getTools()
        .find((el) => el.getName() === this.item);
      if (!toolToDrop) {
        console.log(TEXT_MESSAGE.invalidTool);
        return;
      }
      game.getPlayer().getBackpack().removeTool(toolToDrop.getName());
      game.getCurrentRoom().addTool(toolToDrop);
      console.log(`ℹ️ You dropped ${toolToDrop.getDescription()}`);
      console.log(game.getPlayer().getBackpack().getDescription());
    } else {
      console.log(TEXT_MESSAGE.invalidTool);
    }
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
