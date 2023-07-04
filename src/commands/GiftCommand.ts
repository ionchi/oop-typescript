import { Command } from './Command';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { Game } from '../Game';
import { log } from '../utils/basic-loader';

export default class GiftCommand implements Command {
  private readonly name: string = COMMAND_NAME.gift;
  private item: string;

  public execute(game: Game): void {
    const playerBackpack = game.getPlayer().getBackpack();
    const character = game.getCurrentRoom().getCharacter();
    if (playerBackpack.getTools().length === 0) {
      log.error(TEXT_MESSAGE.noTools);
      return;
    }
    if (!character) {
      log.error(TEXT_MESSAGE.noCharacter);
      return;
    }
    const toolToGift = playerBackpack.getTools()
      .find((el) => el.getName() === this.item);
    if (!toolToGift) {
      log.error(TEXT_MESSAGE.invalidTool);
      return;
    }
    playerBackpack.removeTool(toolToGift.getName());
    log.success(character.receiveGift(game, toolToGift));
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
