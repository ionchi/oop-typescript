import { Character } from './Character';
import { Game } from '../Game';
import { Tool } from '../tools/Tool';

export class Wizard extends Character {
    private static readonly GIFT_MESSAGE = 'You\'ve been given a gift!';
    private static readonly NO_MORE_GIFTS_MESSAGE = 'I don\'t have another gift for you!';
    private static readonly GIFT_RESPONSE = 'I\'ve given you a lighter version of your gift!';

    private gift: Tool | null;

    constructor(name: string, welcomeMessage: string, tool: Tool) {
        super(name, welcomeMessage);
        this.gift = tool;
    }

    public override interact(game: Game): string {
        return this.gift ? this.giveGift(game) : Wizard.NO_MORE_GIFTS_MESSAGE;
    }

    private giveGift(game: Game): string {
        game.getPlayer().getBackpack().addTool(this.gift);
        this.gift = null;
        return Wizard.GIFT_MESSAGE;
    }

    public receiveGift(game: Game, tool: Tool): string {
        game.getCurrentRoom().addTool(this.createLighterTool(tool));
        return Wizard.GIFT_RESPONSE;
    }

    private createLighterTool(tool: Tool): Tool {
        return new Tool(tool.getName(), tool.getWeight() / 2);
    }
}
