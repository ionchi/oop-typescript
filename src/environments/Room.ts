import { Tool } from '../tools/Tool';
import { Character } from '../characters/Character';
import { AdjacentRooms, Direction } from '../utils/types';

export class Room {
  private static MAX_DIRECTIONS = 4;

  private readonly name: string;
  private readonly tools: Tool[];
  private readonly adjacentRooms: AdjacentRooms;
  private character: Character;

  constructor(name: string) {
    this.name = name;
    this.adjacentRooms = {};
    this.tools = [];
  }

  public getName(): string {
    return this.name;
  }

  public setAdjacentRoom(direction: Direction, room: Room): void {
    const availableDirections = Object.keys(this.adjacentRooms);
    if (availableDirections.length < Room.MAX_DIRECTIONS) {
      this.adjacentRooms[direction] = room;
    }
  }

  public getAdjacentRoom(direction: Direction): Room {
    return this.adjacentRooms[direction] || null;
  }

  public addTool(tool: Tool): boolean {
    this.tools.push(tool);
    return true;
  }

  public getTools(): Tool[] {
    return this.tools;
  }

  public hasTool(toolName: string): boolean {
    return this.tools.some(el => el?.getName() === toolName);
  }

  public getTool(toolName: string): Tool {
    return this.tools.find(el => el?.getName() === toolName) || null;
  }

  public removeTool(toolName: string): boolean {
    for (let i = 0; i < this.tools.length; i++) {
      if (this.tools[i]?.getName() === toolName) {
        this.tools.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public getDirections(): Direction[] {
    return Object.keys(this.adjacentRooms) as unknown as Direction[];
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
    description += `Available directions: ${this.getDirections().join(' - ')}\n`;
    const availableTools = this.getTools();
    description += `Tools in the room: ${availableTools.length ? availableTools.map(el =>
      el.getDescription()) : '-'}\n`;
    description += `Character in the room: ${this.character ? this.character.getName() : '-'}\n`;
    description += '#####';
    return description;
  }
}
