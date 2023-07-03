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


type CharacterType = 'dog' | 'witch' | 'wizard';
interface CharacterConfig {
    name: string;
    type: CharacterType;
    welcomeMessage: string;
    room: string;
}

interface ToolConfig {
    name: string;
    weight: number;
    room: string;
}

type RoomType = 'normal' | 'dark' | 'blocked' | 'magic';
interface RoomConfig {
    name: string;
    type: RoomType;
    isWinningRoom?: boolean;
    isInitRoom?: boolean;
    directions: {
        [key in Direction]: string;
    };
    specs?: {
        lightSource?: string;
        blockedDirection?: Direction;
        unlockTool?: string;
        magicThreshold?: number;
    }
}

export interface MapConfig {
    rooms: RoomConfig[];
    tools: ToolConfig[];
    characters: CharacterConfig[];
}
