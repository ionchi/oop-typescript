import { Room } from './Room';
import { Tool } from '../tools/Tool';
import config from '../config';

export class MagicRoom extends Room {
    private magicCounter: number;
    private readonly magicThreshold: number;
    private static readonly DEFAULT_MAGIC_THRESHOLD = config.magicRoomThreshold;

    constructor(name: string, threshold?: number) {
        super(name);
        this.magicCounter = 0;
        this.magicThreshold = threshold || MagicRoom.DEFAULT_MAGIC_THRESHOLD;
    }

    public getMagicThreshold(): number {
        return this.magicThreshold;
    }

    public override addTool(tool: Tool): boolean {
        this.magicCounter++;
        if (this.magicCounter > this.magicThreshold) {
            const modifiedTool = this.modifyTool(tool);
            return super.addTool(modifiedTool);
        }
        return super.addTool(tool);
    }

    private modifyTool(tool: Tool): Tool {
        const reversedName = this.reverseString(tool.getName());
        const doubledWeight = 2 * tool.getWeight();

        return new Tool(reversedName, doubledWeight);
    }

    private reverseString(str: string): string {
        return str.split('').reverse().join('');
    }
}
