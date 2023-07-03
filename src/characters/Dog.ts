import { Game } from '../Game';
import { Character } from './Character';
import { TEXT_MESSAGE } from '../utils/static-data';
import { Tool } from '../tools/Tool';

export class Dog extends Character {
    private readonly GIFT_MESSAGE = 'Woof! There is a new tool for you in the room!';
    private readonly DESIRED_GIFT: string = 'bone';
    public interact(game: Game): string {
        const currentPlayer = game.getPlayer();
        if (currentPlayer) {
            currentPlayer.setPoints(currentPlayer.getPoints() - 1);
            return TEXT_MESSAGE.dogBadInteraction;
        }
        return 'Woof!';
    }

    public receiveGift(game: Game, tool: Tool): string {
        if (tool.getName() === this.DESIRED_GIFT) {
            const lantern = new Tool('lantern', 3);
            game.getCurrentRoom().addTool(lantern);
            return this.GIFT_MESSAGE;
        } else {
            game.getPlayer().setPoints(game.getPlayer().getPoints() - 1);
            return TEXT_MESSAGE.dogBadInteraction;
        }
    }
}
