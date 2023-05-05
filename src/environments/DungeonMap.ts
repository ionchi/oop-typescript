import { Room } from './Room';
import { Tool } from '../tools/Tool';

export class DungeonMap {
  private initRoom: Room;
  private winningRoom: Room;

  constructor() {
    this.init();
  }

  private init(): void {
    const lantern = new Tool('lantern', 3);
    const bone = new Tool('bone', 1);

    const hall = new Room('hall');
    const room1 = new Room('room N1');
    const room2 = new Room('room N2');
    const lab = new Room('lab');
    const library = new Room('library');

    hall.setAdjacentRoom('north', library);
    hall.setAdjacentRoom('east', room1);
    hall.setAdjacentRoom('south', room2);
    hall.setAdjacentRoom('west', lab);
    room1.setAdjacentRoom('east', lab);
    room1.setAdjacentRoom('west', hall);
    room2.setAdjacentRoom('north', hall);
    room2.setAdjacentRoom('east', room1);
    room2.setAdjacentRoom('west', lab);
    lab.setAdjacentRoom('east', hall);
    lab.setAdjacentRoom('west', room1);
    library.setAdjacentRoom('south', hall);

    room2.addTool(lantern);
    hall.addTool(bone);

    this.initRoom = hall;
    this.winningRoom = library;
  }

  public getInitRoom(): Room {
    return this.initRoom;
  }

  public getWinningRoom(): Room {
    return this.winningRoom;
  }
}
