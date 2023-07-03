import { describe, expect, test } from 'vitest';
import { BlockedRoom } from '../environments/BlockedRoom';
import { Tool } from '../tools/Tool';
import { Room } from '../environments/Room';
import { Direction } from '../utils/types';

describe('BlockedRoom', () => {
  test('Should create a blocked room with a name, a blocked direction, a needed unlock tool' +
        ', no available directions and no tools', () => {
    const room = new BlockedRoom('blocked room', 'key', Direction.north);

    expect(room.getName()).toBe('blocked room');
    expect(room.getDirections()).toEqual([]);
    expect(room.getBlockedDirection()).toEqual('north');
    expect(room.getUnlockToolName()).toEqual('key');
  });

  test('Should return self as adjacent room in the blocked direction, if no key object is in the room', () => {
    const blockedRoom = new BlockedRoom('blocked room', 'key', Direction.north);
    const roomTwo = new Room('room');

    blockedRoom.setAdjacentRoom(Direction.north, roomTwo);

    const adjacentRoom = blockedRoom.getAdjacentRoom(Direction.north);

    expect(adjacentRoom.getName()).toEqual(blockedRoom.getName());
    expect(blockedRoom.getDirections()).toEqual([]);
  });

  test('Should return the correct adjacent room in the blocked direction, if the key object is in the room', () => {
    const blockedRoom = new BlockedRoom('blocked room', 'key', Direction.north);
    const roomTwo = new Room('room');

    const key = new Tool('key', 1);

    blockedRoom.setAdjacentRoom(Direction.north, roomTwo);
    blockedRoom.addTool(key);

    const adjacentRoom = blockedRoom.getAdjacentRoom(Direction.north);

    expect(adjacentRoom.getName()).toEqual(roomTwo.getName());
    expect(blockedRoom.getDirections()).toEqual(['north']);
  });
});
