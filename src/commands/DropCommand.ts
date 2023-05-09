import { Command } from './Command';
import { Game } from '../Game';

export class DropCommand implements Command {
  private item: string;
  private readonly name: string = 'drop';

  public execute(game: Game): void {
    if (this.item) {
      const toolToDrop = game.getPlayer().getBackpack().getTools()
        .find((el) => el.getName() === this.item);
      if (!toolToDrop) {
        console.log('⚠️ Invalid tool!');
        return;
      }
      game.getPlayer().getBackpack().removeTool(toolToDrop.getName());
      game.getCurrentRoom().addTool(toolToDrop);
      console.log(`ℹ️ You dropped ${toolToDrop.getDescription()}`);
      console.log(game.getPlayer().getBackpack().getDescription());
    } else {
      console.log('⚠️ Invalid tool!');
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
