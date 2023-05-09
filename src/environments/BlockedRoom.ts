import { Room } from './Room';

export class BlockedRoom extends Room {
    private static readonly DEFAULT_KEY_TOOL = 'key';
    private static readonly DEFAULT_BLOCKED_DIRECTION = 'north';
    private readonly unlockTool: string;
    private readonly blockedDirection: string;

    constructor(name: string, unlockObject?: string, blockedDirection?: string) {
        super(name);
        this.unlockTool = unlockObject || BlockedRoom.DEFAULT_KEY_TOOL;
        this.blockedDirection = blockedDirection || BlockedRoom.DEFAULT_BLOCKED_DIRECTION;
    }

    public getUnlockToolName(): string {
        return this.unlockTool;
    }

    public getBlockedDirection(): string {
        return !this.isUnlocked() ? this.blockedDirection : '';
    }

    private isUnlocked(): boolean {
        return this.hasTool(this.unlockTool);
    }

    public override getAdjacentRoom(direction: string): Room {
        if (direction === this.blockedDirection && !this.isUnlocked()) {
            return this;
        }
        return super.getAdjacentRoom(direction);
    }

    public override getAvailableDirections(): string[] {
        const directions = super.getAvailableDirections();
        if (this.isUnlocked()) {
            return directions;
        } else {
            return directions.filter(el => el !== this.blockedDirection);
        }
    }
}
