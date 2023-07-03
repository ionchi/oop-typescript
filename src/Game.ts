import { Room } from './environments/Room';
import { Player } from './player/Player';
// import { DungeonUploader } from './environments/DungeonUploader';
import { Dungeon } from './environments/Dungeon';
import { DungeonStatic } from './environments/DungeonStatic';

export class Game {
  private dungeonMap: Dungeon;
  private currentRoom: Room;
  private readonly player: Player;
  private gameOver: boolean;

  constructor() {
    // this.dungeonMap = new DungeonUploader('./src/defaultDungeon.json');
    this.dungeonMap = new DungeonStatic();
    this.currentRoom = this.dungeonMap.getInitRoom();
    this.player = new Player();
    this.gameOver = false;
  }

  public getCurrentRoom(): Room {
    return this.currentRoom;
  }

  public setCurrentRoom(room: Room): void {
    this.currentRoom = room;
  }

  public isWon(): boolean {
    return this.currentRoom.getName() === this.dungeonMap.getWinningRoom().getName();
  }

  public isGameOver(): boolean {
    return this.gameOver || this.isWon() || this.player.getPoints() === 0;
  }

  public setGameOver(): void {
    this.gameOver = true;
  }

  public getPlayer(): Player {
    return this.player;
  }
}
