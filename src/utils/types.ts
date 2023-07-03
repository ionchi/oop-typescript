import { Room } from '../environments/Room';

export enum Direction {
    'north' = 'north',
    'east' = 'east',
    'south' = 'south',
    'west' = 'west'
}
export type AdjacentRooms = {
    [key in Direction]: Room;
} | {};
