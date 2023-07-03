import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';

export default class PickCommand implements Command {
  public readonly name = COMMAND_NAME.pick;
  private item: string;

  public execute(game: Game): void {
    const roomTools = game.getCurrentRoom().getTools();
    const tool = roomTools.find((el) => el.getName() === this.item);
    if (!tool) {
      console.log(TEXT_MESSAGE.invalidTool);
      return;
    }
    game.getPlayer().getBackpack().addTool(tool);
    game.getCurrentRoom().removeTool(tool.getName());
    console.log(`ℹ️ You picked ${tool.getDescription()}`);
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
