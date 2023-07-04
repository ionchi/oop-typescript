import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { log } from '../utils/basic-loader';

export default class PickCommand implements Command {
  public readonly name = COMMAND_NAME.pick;
  private item: string;

  public execute(game: Game): void {
    const roomTools = game.getCurrentRoom().getTools();
    const tool = roomTools.find((el) => el.getName() === this.item);
    if (!tool) {
      log.error(TEXT_MESSAGE.invalidTool);
      return;
    }
    game.getPlayer().getBackpack().addTool(tool);
    game.getCurrentRoom().removeTool(tool.getName());
    log.success(`ℹ️ You picked ${tool.getDescription()}`);
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
