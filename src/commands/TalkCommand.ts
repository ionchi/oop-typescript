import { Command } from './Command';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { Game } from '../Game';
import { log } from '../utils/basic-loader';

export default class TalkCommand implements Command {
  private readonly name = COMMAND_NAME.talk;
  private characterName: string;

  public execute(game: Game): void {
    const currentRoom = game.getCurrentRoom();
    const character = currentRoom.getCharacter();

    if (!character) {
      log.error(TEXT_MESSAGE.noCharacter);
      return;
    }

    log.info(character.talk());
  }

  public setParameter(param: string): void {
    this.characterName = param;
  }

  public getParameter(): string {
    return this.characterName;
  }

  public getName(): string {
    return this.name;
  }
}
