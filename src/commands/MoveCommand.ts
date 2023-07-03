import { Command } from './Command';
import { Game } from '../Game';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { Direction } from '../utils/types';

export default class MoveCommand implements Command {
  private readonly name = COMMAND_NAME.move;
  private direction: string;

  public execute(game: Game): void {
    const currentRoom = game.getCurrentRoom();
    let nextRoom = null;

    const dir = this.direction as unknown as Direction;
    if (!this.direction || !Object.values(Direction).includes(dir)) {
      console.log(TEXT_MESSAGE.invalidDirection);
      return;
    }

    nextRoom = currentRoom.getAdjacentRoom(dir);

    if (!nextRoom) {
      console.log(TEXT_MESSAGE.invalidDirection);
      return;
    }

    game.setCurrentRoom(nextRoom);
    console.log(game.getCurrentRoom().getName());
    const points = game.getPlayer().getPoints();
    game.getPlayer().setPoints(points - 1);
  }

  public setParameter(param: string): void {
    this.direction = param;
  }

  public getParameter(): string {
    return this.direction;
  }

  public getName(): string {
    return this.name;
  }
}
