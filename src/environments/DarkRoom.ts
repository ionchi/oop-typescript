import { Room } from './Room';
import { TEXT_MESSAGE } from '../static-data';

export class DarkRoom extends Room {
    private static readonly DEFAULT_LIGHT_OBJECT = 'lantern';
    private readonly lightToolName: string;

    constructor(name: string, lightToolName?: string) {
        super(name);
        this.lightToolName = lightToolName || DarkRoom.DEFAULT_LIGHT_OBJECT;
    }

    public getLightToolName(): string {
        return this.lightToolName;
    }

    private hasLight(): boolean {
        return this.hasTool(this.lightToolName);
    }

    public override getDescription(): string {
        if (this.hasLight()) {
            return super.getDescription();
        } else {
            return TEXT_MESSAGE.darkRoomMessage;
        }
    }
}
