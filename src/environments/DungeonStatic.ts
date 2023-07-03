import { Room } from './Room';
import { Tool } from '../tools/Tool';
import { MagicRoom } from './MagicRoom';
import { DarkRoom } from './DarkRoom';
import { BlockedRoom } from './BlockedRoom';
import { Dog } from '../characters/Dog';
import { Witch } from '../characters/Witch';
import { Wizard } from '../characters/Wizard';
import { Direction } from '../utils/types';
import { Dungeon } from './Dungeon';

export class DungeonStatic extends Dungeon {
  constructor() {
    super();
  }
  protected init(): void {
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
    const wizard = new Wizard('wizard', 'Abracadabra');

    hall.setAdjacentRoom(Direction.north, library);
    hall.setAdjacentRoom(Direction.east, room1);
    hall.setAdjacentRoom(Direction.south, room2);
    hall.setAdjacentRoom(Direction.west, lab);
    room1.setAdjacentRoom(Direction.west, hall);
    room2.setAdjacentRoom(Direction.north, hall);
    lab.setAdjacentRoom(Direction.east, hall);
    library.setAdjacentRoom(Direction.south, hall);

    room2.addTool(lantern);
    hall.addTool(bone);
    room1.addTool(key);

    hall.setCharacter(dog);
    lab.setCharacter(wizard);
    room1.setCharacter(witch);

    this.initRoom = hall;
    this.winningRoom = library;
  }
}
