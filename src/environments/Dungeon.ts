import { Room } from './Room';

export abstract class Dungeon {
  protected initRoom: Room;
  protected winningRoom: Room;

  protected constructor(options?: string) {
    this.init(options);
  }

  protected abstract init(options?: string): void;

  public getInitRoom(): Room {
    return this.initRoom;
  }

  public getWinningRoom(): Room {
    return this.winningRoom;
  }
}
