import { expect, test, describe } from 'vitest';
import { Room } from '../environments/Room';
import { Tool } from '../tools/Tool';

describe('Room', () => {
  test('Should create a room with a name and no directions and tools', () => {
    const room = new Room('room');

    expect(room.getName()).toBe('room');
    expect(room.getAvailableDirections()).toEqual([]);
    expect(room.getAvailableTools()).toEqual([]);
  });

  test('Should add an adjacent room', () => {
    const room = new Room('room');
    const adjacentRoom = new Room('adjacentRoom');

    room.setAdjacentRoom('north', adjacentRoom);

    expect(room.getAvailableDirections()).toEqual(['north']);
    expect(room.getAdjacentRoom('north').getName()).toEqual(adjacentRoom.getName());
  });

  test('Should update an existing adjacent room', () => {
    const room = new Room('room');
    const adjacentRoom = new Room('adjacentRoom');
    const adjacentRoom2 = new Room('adjacentRoom2');

    room.setAdjacentRoom('north', adjacentRoom);
    room.setAdjacentRoom('north', adjacentRoom2);

    expect(room.getAvailableDirections()).toEqual(['north']);
    expect(room.getAdjacentRoom('north').getName()).toEqual(adjacentRoom2.getName());
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
