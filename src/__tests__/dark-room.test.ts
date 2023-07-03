import { describe, expect, test } from 'vitest';
import { DarkRoom } from '../environments/DarkRoom';
import { Tool } from '../tools/Tool';
import { Room } from '../environments/Room';
import { TEXT_MESSAGE } from '../utils/static-data';

describe('DarkRoom', () => {
    test('Should create a dark room with a name, a needed light object, no directions and no tools', () => {
        const room = new DarkRoom('dark room', 'torch');

        expect(room.getName()).toBe('dark room');
        expect(room.getDirections()).toEqual([]);
        expect(room.getLightToolName()).toEqual('torch');
    });

    test('Should return a different description if there is no light', () => {
        const room = new DarkRoom('dark room', 'torch');

        expect(room.getDescription()).toEqual(TEXT_MESSAGE.darkRoomMessage);
    });

    test('Should behave normally if there is the light tool in the room', () => {
        const room = new DarkRoom('room', 'torch');
        const normalRoom = new Room('room');
        const torch = new Tool('torch', 1);

        room.addTool(torch);
        normalRoom.addTool(torch);

        expect(room.getDescription()).toEqual(normalRoom.getDescription());
    });
});
