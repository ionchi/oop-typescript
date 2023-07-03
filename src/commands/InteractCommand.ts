import { Command } from './Command';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { Game } from '../Game';

export default class InteractCommand implements Command {
  private readonly name = COMMAND_NAME.interact;
  private characterName: string;

  public execute(game: Game): void {
    const currentRoom = game.getCurrentRoom();
    const character = currentRoom.getCharacter();

    if (!character) {
      console.log(TEXT_MESSAGE.noCharacter);
      return;
    }

    console.log(character.interact(game));
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
