import { describe, expect, test } from 'vitest';
import { MagicRoom } from '../environments/MagicRoom';
import { Tool } from '../tools/Tool';

describe('MagicRoom', () => {
    test('Should create a magic room with a name, a magic threshold, no directions and no tools', () => {
        const room = new MagicRoom('magic room', 2);

        expect(room.getName()).toBe('magic room');
        expect(room.getAvailableDirections()).toEqual([]);
        expect(room.getAvailableTools()).toEqual([]);
        expect(room.getMagicThreshold()).toEqual(2);
    });

    test('Should behave normally if the number of drops is under the threshold', () => {
        const room = new MagicRoom('magic room', 1);
        const tool = new Tool('rock', 2);

        room.addTool(tool);

        const toolInTheRoom = room.getTool('rock');

        expect(toolInTheRoom.getName()).toEqual('rock');
        expect(toolInTheRoom.getWeight()).toEqual(2);
    });

    test('Should behave magically after N object drops', () => {
        const room = new MagicRoom('magic room', 1);
        const tool = new Tool('bone', 1);
        const tool2 = new Tool('rock', 2);

        room.addTool(tool);
        room.addTool(tool2);

        const toolInTheRoom = room.getTool('kcor');

        expect(toolInTheRoom.getName()).toEqual('kcor');
        expect(toolInTheRoom.getWeight()).toEqual(4);
    });
});
