import { Game } from '../Game';
import { Character } from './Character';
import { TEXT_MESSAGE } from '../static-data';

export class Dog extends Character {
    public interact(game: Game): string {
        const currentPlayer = game.getPlayer();
        if (currentPlayer) {
            currentPlayer.setPoints(currentPlayer.getPoints() - 1);
            return TEXT_MESSAGE.dogInteraction;
        }
        return 'Woof!';
    }
}
