import { Character } from './Character';
import { Game } from '../Game';
import { Room } from '../environments/Room';

export class Witch extends Character {
    private readonly GIFT_RESPONSE = 'HA HA HA!';
    public override interact(game: Game): string {
        const availableDirections = game.getCurrentRoom().getDirections();
        const adjacentRooms = [];
        for (const direction of availableDirections) {
            const adjacentRoom = game.getCurrentRoom().getAdjacentRoom(direction);
            adjacentRooms.push(adjacentRoom);
        }
        let newRoom: Room;
        if (this.getHasBeenWelcomed()) {
            // Room with the most tools
            newRoom = adjacentRooms.reduce((prev, current) => {
                return (prev.getTools().length > current.getTools().length) ? prev : current;
            }, adjacentRooms[0]);
        } else {
            // Room with the least tools
            newRoom = adjacentRooms.reduce((prev, current) => {
                return (prev.getTools().length < current.getTools().length) ? prev : current;
            }, adjacentRooms[0]);
        }
        game.setCurrentRoom(newRoom);
        return 'You\'ve been cursed!';
    }

    public override receiveGift(): string {
        return this.GIFT_RESPONSE;
    }
}
