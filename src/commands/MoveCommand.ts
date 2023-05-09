import { Command } from './Command';
import { Game } from '../Game';

export class MoveCommand implements Command {
  private readonly name = 'move';
  private direction: string;

  public execute(game: Game): void {
    const currentRoom = game.getCurrentRoom();
    let nextRoom = null;

    if (!this.direction) {
      console.log('⚠️ Invalid direction!');
      return;
    }

    nextRoom = currentRoom.getAdjacentRoom(this.direction);

    if (!nextRoom) {
      console.log('⚠️ Non existing direction!');
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
