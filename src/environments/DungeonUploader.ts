import { resolve } from 'path';

import { Tool } from '../tools/Tool';
import { Room } from './Room';
import { Character } from '../characters/Character';
import { BlockedRoom } from './BlockedRoom';
import { DarkRoom } from './DarkRoom';
import { MagicRoom } from './MagicRoom';
import { Direction, MapConfig } from '../utils/types';
import { Dog } from '../characters/Dog';
import { Witch } from '../characters/Witch';
import { Wizard } from '../characters/Wizard';
import { Dungeon } from './Dungeon';

export class DungeonUploader extends Dungeon {
  constructor(path: string) {
    super(path);
  }
  private requireJson(path: string) {
    return require(resolve(process.cwd(), path));
  }
  protected init(path: string): void {
    try {
      let mapConfig: MapConfig = this.requireJson(path);

      const rooms: Room[] = [];

      // Initialize rooms
      for (let roomData of mapConfig.rooms) {
        // Create based on room type
        let room: Room;
        switch (roomData.type) {
        case 'blocked':
          const unlockObj = roomData.specs?.unlockTool;
          const blockedDirection = roomData.specs?.blockedDirection;
          room = new BlockedRoom(roomData.name, unlockObj, blockedDirection);
          break;
        case 'dark':
          room = new DarkRoom(roomData.name, roomData.specs?.lightSource);
          break;
        case 'magic':
          room = new MagicRoom(roomData.name, roomData.specs?.magicThreshold);
          break;
        default:
          room = new Room(roomData.name);
        }

        if (roomData.isInitRoom) {
          this.initRoom = room;
        }
        if (roomData.isWinningRoom) {
          this.winningRoom = room;
        }

        rooms.push(room);
      }

      // Add adjacent rooms
      for (let roomData of mapConfig.rooms) {
        let room = rooms.find(r => r.getName() === roomData.name);
        if (room) {
          for (let direction in roomData.directions) {
            let adjacentRoom = rooms.find(r => r.getName() === roomData.directions[direction]);
            if (adjacentRoom) {
              room.setAdjacentRoom(direction as Direction, adjacentRoom);
            }
          }
        }
      }

      // Initialize tools
      for (let toolData of mapConfig.tools) {
        const room = rooms.find(r => r.getName() === toolData.room);
        if (room) {
          const tool = new Tool(toolData.name, toolData.weight);
          room.addTool(tool);
        }
      }

      // Initialize characters
      for (let charData of mapConfig.characters) {
        // Create based on character type
        let character: Character;
        switch (charData.type) {
        case 'dog':
          character = new Dog(charData.name, charData.welcomeMessage);
          break;
        case 'witch':
          character = new Witch(charData.name, charData.welcomeMessage);
          break;
        case 'wizard':
          character = new Wizard(charData.name, charData.welcomeMessage);
          break;
        default:
          break;
        }

        if (character) {
          const room = rooms.find(r => r.getName() === charData.room);
          if (room) {
            room.setCharacter(character);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}
