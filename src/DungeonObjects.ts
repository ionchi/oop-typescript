import { Game } from './Game';
import { prompt } from './helpers';
import * as console from 'console';
import { Room } from './Room';
import * as process from 'process';

export class DungeonObjects {
  private static readonly INIT_MESSAGE = 'Welcome to the dungeon!';
  private static readonly AVAILABLE_COMMANDS = ['move', 'help', 'quit'];
  private static readonly AVAILABLE_DIRECTIONS = ['north', 'east', 'south', 'west'];

  private game: Game;

  constructor() {
    this.game = new Game();
  }

  public async play(): Promise<void> {
    console.log(DungeonObjects.INIT_MESSAGE);
    console.log(DungeonObjects.AVAILABLE_COMMANDS);

    let action = '';
    while(action !== 'quit') {
      action = await prompt.question('What do you want to do? Type one of the available commands \n');
      switch(action.toLowerCase()) {
        case 'move':
          console.log('\nAvailable directions:');
          console.log(DungeonObjects.AVAILABLE_DIRECTIONS);
          console.log('');
          const direction = await prompt.question('Type a direction \n');
          if (direction) {
            this.move(direction);
          }
          break;
        case 'help':
          this.help();
          break;
        case 'quit':
          this.end();
          break;
        default:
          console.log('Invalid answer!');
      }
    }
    prompt.close();

    if (this.game.isWon()) {
      console.log('You won!');
    }
  }

  private move(direction: string): void {
    let nextRoom: Room = null;
    nextRoom = this.game.getCurrentRoom().getAdjacentRoom(direction);

    if (!nextRoom) {
      console.log('Invalid direction!');
    } else {
      this.game.setCurrentRoom(nextRoom);
      const points = this.game.getPoints();
      this.game.setPoints(points - 1);
    }
    console.log(this.game.getCurrentRoom().getDescription());
  }

  private help(): void {
    console.log('#####');
    console.log('Available commands:');
    for (const command of DungeonObjects.AVAILABLE_COMMANDS) {
      console.log(command);
    }
    console.log('##### \n');
  }

  private end(): void {
    console.log('Thanks for playing!');
    process.exit(1);
  }
}
