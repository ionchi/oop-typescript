import { Room } from './Room';
import { Tool } from './Tool';
export class Game {
  private static readonly INIT_POINTS = 20;
  private currentRoom: Room;
  private winningRoom: Room;
  private gameOver: boolean;
  private points: number;

  constructor() {
    this.createRooms();
    this.gameOver = false;
    this.points = Game.INIT_POINTS;
  }

  private createRooms(): void {
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

    this.currentRoom = hall;
    this.winningRoom = library;
  }

  public getWinningRoom(): Room {
    return this.winningRoom;
  }

  public getCurrentRoom(): Room {
    return this.currentRoom;
  }

  public setCurrentRoom(room: Room): void {
    this.currentRoom = room;
  }

  public isWon(): boolean {
    return this.currentRoom === this.winningRoom;
  }

  public isGameOver(): boolean {
    return this.gameOver || this.isWon() || this.points === 0;
  }

  public setGameOver(): void {
    this.gameOver = true;
  }

  public getPoints(): number {
    return this.points;
  }

  public setPoints(points: number): void {
    this.points = points;
  }
}
