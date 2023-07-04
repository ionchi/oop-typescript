import { Command } from './Command';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { Game } from '../Game';
import { log } from '../utils/basic-loader';

export default class InteractCommand implements Command {
  private readonly name = COMMAND_NAME.interact;
  private characterName: string;

  public execute(game: Game): void {
    const currentRoom = game.getCurrentRoom();
    const character = currentRoom.getCharacter();

    if (!character) {
      log.error(TEXT_MESSAGE.noCharacter);
      return;
    }

    log.success(character.interact(game));
  }

  public setParameter(param: string) {
    this.characterName = param;
  }

  public getParameter(): string {
    return this.characterName;
  }

  public getName(): string {
    return this.name;
  }
}
