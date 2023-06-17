import { Room } from './Room';
import { Tool } from '../tools/Tool';
import { MagicRoom } from './MagicRoom';
import { DarkRoom } from './DarkRoom';
import { BlockedRoom } from './BlockedRoom';
import { Dog } from '../characters/Dog';
import { Witch } from '../characters/Witch';
import { Wizard } from '../characters/Wizard';

export class DungeonMap {
  private initRoom: Room;
  private winningRoom: Room;

  constructor() {
    this.init();
  }

  private init(): void {
    const lantern = new Tool('lantern', 3);
    const bone = new Tool('bone', 1);
    const key = new Tool('key', 1);

    const hall = new BlockedRoom('hall');
    const room1 = new DarkRoom('room N1');
    const room2 = new Room('room N2');
    const lab = new MagicRoom('lab');
    const library = new Room('library');

    const dog = new Dog('dog', 'woof');
    const witch = new Witch('witch', 'Bibbidi bobbidi boo');
    const gift = new Tool('key', 1);
    const wizard = new Wizard('wizard', 'Abracadabra', gift);

    hall.setAdjacentRoom('north', library);
    hall.setAdjacentRoom('east', room1);
    hall.setAdjacentRoom('south', room2);
    hall.setAdjacentRoom('west', lab);
    room1.setAdjacentRoom('west', hall);
    room2.setAdjacentRoom('north', hall);
    lab.setAdjacentRoom('east', hall);
    library.setAdjacentRoom('south', hall);

    room2.addTool(lantern);
    hall.addTool(bone);
    room1.addTool(key);

    hall.setCharacter(dog);
    lab.setCharacter(wizard);
    room1.setCharacter(witch);

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
