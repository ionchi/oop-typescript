import { describe, expect, test } from 'vitest';
import { Room } from '../environments/Room';
import { Tool } from '../tools/Tool';
import { Direction } from '../utils/types';

describe('Room', () => {
  test('Should create a room with a name and no directions and tools', () => {
    const room = new Room('room');

    expect(room.getName()).toBe('room');
    expect(room.getDirections()).toEqual([]);
    expect(room.getTools()).toEqual([]);
  });

  test('Should add an adjacent room', () => {
    const room = new Room('room');
    const adjacentRoom = new Room('adjacentRoom');

    room.setAdjacentRoom(Direction.north, adjacentRoom);

    expect(room.getDirections()).toEqual(['north']);
    expect(room.getAdjacentRoom(Direction.north).getName()).toEqual(adjacentRoom.getName());
  });

  test('Should update an existing adjacent room', () => {
    const room = new Room('room');
    const adjacentRoom = new Room('adjacentRoom');
    const adjacentRoom2 = new Room('adjacentRoom2');

    room.setAdjacentRoom(Direction.north, adjacentRoom);
    room.setAdjacentRoom(Direction.north, adjacentRoom2);

    expect(room.getDirections()).toEqual(['north']);
    expect(room.getAdjacentRoom(Direction.north).getName()).toEqual(adjacentRoom2.getName());
  });

  test('Should add a tool', () => {
    const room = new Room('room');
    const tool = new Tool('tool', 2);

    room.addTool(tool);

    expect(room.hasTool(tool.getName())).toBe(true);
  });

  test('Should remove a tool', () => {
    const room = new Room('room');
    const tool = new Tool('tool', 2);

    room.addTool(tool);
    room.removeTool(tool.getName());

    expect(room.hasTool(tool.getName())).toBe(false);
  });
});
