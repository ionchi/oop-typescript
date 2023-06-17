import { Tool } from '../tools/Tool';
import { Character } from '../characters/Character';

export class Room {
  private static MAX_DIRECTIONS = 4;
  private static MAX_TOOLS = 10;

  private readonly name: string;
  private readonly tools: Tool[];
  private toolsNumber: number;
  private readonly adjacentRooms: Room[];
  private adjacentRoomsNumber: number;
  private readonly directions: string[];
  private character: Character;

  constructor(name: string) {
    this.name = name;
    this.adjacentRoomsNumber = 0;
    this.toolsNumber = 0;
    this.directions = new Array(Room.MAX_DIRECTIONS);
    this.adjacentRooms = new Array(Room.MAX_DIRECTIONS);
    this.tools = new Array(Room.MAX_TOOLS);
  }

  public getName(): string {
    return this.name;
  }

  public setAdjacentRoom(direction: string, room: Room): void {
    let updated = false;
    for (let i = 0; i < this.adjacentRoomsNumber; i++) {
      if (this.directions[i] === direction) {
        this.adjacentRooms[i] = room;
        updated = true;
      }
    }
    if (!updated && this.adjacentRoomsNumber < Room.MAX_DIRECTIONS) {
      this.directions[this.adjacentRoomsNumber] = direction;
      this.adjacentRooms[this.adjacentRoomsNumber] = room;
      this.adjacentRoomsNumber++;
    }
  }

  public getAdjacentRoom(direction: string): Room {
    let room: Room = null;
    for (let i = 0; i < this.adjacentRoomsNumber; i++) {
      if (this.directions[i] === direction) {
        room = this.adjacentRooms[i];
      }
    }
    return room;
  }

  public addTool(tool: Tool): boolean {
    if (this.toolsNumber < Room.MAX_TOOLS) {
      this.tools[this.toolsNumber] = tool;
      this.toolsNumber++;
      return true;
    } else {
      return false;
    }
  }

  public getTools(): Tool[] {
    return this.tools;
  }

  public hasTool(toolName: string): boolean {
    let found = false;
    for (let i = 0; i < this.toolsNumber; i++) {
      if (this.tools[i]?.getName() === toolName) {
        found = true;
      }
    }
    return found;
  }

  public getTool(toolName: string): Tool {
    let tool: Tool = null;
    for (let i = 0; i < this.toolsNumber; i++) {
      if (this.tools[i].getName() === toolName) {
        tool = this.tools[i];
      }
    }
    return tool;
  }

  public removeTool(toolName: string): boolean {
    let removed = false;
    for (let i = 0; i < this.toolsNumber; i++) {
      if (this.tools[i]?.getName() === toolName) {
        this.tools[i] = null;
        removed = true;
      }
    }
    return removed;
  }

  public getDirections(): string[] {
    return this.directions;
  }

  public getAvailableDirections(): string[] {
    return this.directions.filter(el => !!el);
  }

  public getAvailableTools(): Tool[] {
    return this.tools.filter(el => !!el?.getName());
  }

  public setCharacter(character: Character): void {
    this.character = character;
  }

  public getCharacter(): Character {
    return this.character;
  }

  public getDescription(): string {
    let description = '#####\n';
    description += `🛏️ Room: ${this.name}\n`;
    description += `Available directions: ${this.getAvailableDirections().join(' - ')}\n`;
    const availableTools = this.getAvailableTools();
    description += `Tools in the room: ${availableTools.length ? availableTools.map(el =>
        el.getDescription()) : '-'}\n`;
    description += `Character in the room: ${this.character ? this.character.getName() : '-'}\n`;
    description += '#####';
    return description;
  }
}
