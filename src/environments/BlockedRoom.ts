import { Room } from './Room';
import { Direction } from '../types';

export class BlockedRoom extends Room {
    private static readonly DEFAULT_KEY_TOOL = 'key';
    private static readonly DEFAULT_BLOCKED_DIRECTION = Direction.north;
    private readonly unlockTool: string;
    private readonly blockedDirection: Direction;

    constructor(name: string, unlockObject?: string, blockedDirection?: Direction) {
        super(name);
        this.unlockTool = unlockObject || BlockedRoom.DEFAULT_KEY_TOOL;
        this.blockedDirection = blockedDirection || BlockedRoom.DEFAULT_BLOCKED_DIRECTION;
    }

    public getUnlockToolName(): string {
        return this.unlockTool;
    }

    public getBlockedDirection(): Direction {
        return !this.isUnlocked() ? this.blockedDirection : null;
    }

    private isUnlocked(): boolean {
        return this.hasTool(this.unlockTool);
    }

    public override getAdjacentRoom(direction: Direction): Room {
        if (direction === this.blockedDirection && !this.isUnlocked()) {
            return this;
        }
        return super.getAdjacentRoom(direction);
    }

    public override getDirections(): Direction[] {
        const directions = super.getDirections();
        if (this.isUnlocked()) {
            return directions;
        } else {
            return directions.filter(el => el !== this.blockedDirection);
        }
    }
}
