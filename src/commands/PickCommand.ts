import { Command } from './Command';
import { Game } from '../Game';

export class PickCommand implements Command {
  public readonly name = 'pick';
  private item: string;

  public execute(game: Game): void {
    const roomTools = game.getCurrentRoom().getAvailableTools();
    const tool = roomTools.find((el) => el.getName() === this.item);
    if (tool) {
      game.getPlayer().getBackpack().addTool(tool);
      game.getCurrentRoom().removeTool(tool.getName());
      console.log(`ℹ️ You picked ${tool.getDescription()}`);
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
