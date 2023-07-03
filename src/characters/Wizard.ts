import { Character } from './Character';
import { Game } from '../Game';
import { Tool } from '../tools/Tool';

export class Wizard extends Character {
    private readonly GIFT_MESSAGE = 'You\'ve been given a gift!';
    private readonly NO_MORE_GIFTS_MESSAGE = 'I don\'t have another gift for you!';
    private readonly GIFT_RESPONSE = 'I\'ve given you a lighter version of your gift!';

    private gift: Tool;

    constructor(name: string, welcomeMessage: string, tool: Tool) {
        super(name, welcomeMessage);
        this.gift = tool;
    }
    public override interact(game: Game): string {
        if (this.gift) {
            game.getPlayer().getBackpack().addTool(this.gift);
            this.gift = null;
            return this.GIFT_MESSAGE;
        } else {
            return this.NO_MORE_GIFTS_MESSAGE;
        }
    }

    public receiveGift(game: Game, tool: Tool): string {
        const lighterTool = new Tool(tool.getName(), tool.getWeight() / 2);
        game.getCurrentRoom().addTool(lighterTool);
        return this.GIFT_RESPONSE;
    }
}
