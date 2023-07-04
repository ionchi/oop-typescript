import { Character } from './Character';
import { Game } from '../Game';
import { Room } from '../environments/Room';

export class Witch extends Character {
  private static readonly GIFT_RESPONSE = 'HA HA HA!';
  private static readonly CURSE_RESPONSE = 'You\'ve been cursed!';
  public override interact(game: Game): string {
    const currentRoom = game.getCurrentRoom();
    const availableDirections = currentRoom.getDirections();
    const adjacentRooms = availableDirections.map(direction =>
      currentRoom.getAdjacentRoom(direction));

    // Determine the criteria for selecting new room based on Witch's reception.
    const roomSelectionCriteria = (this.getHasBeenWelcomed())
      ? (prev: Room, current: Room) =>
        (prev.getTools().length > current.getTools().length) ? prev : current // Room with the most tools
      : (prev: Room, current: Room) =>
        (prev.getTools().length < current.getTools().length) ? prev : current; // Room with the least tools

    const newRoom = adjacentRooms.reduce(roomSelectionCriteria, adjacentRooms[0]);

    game.setCurrentRoom(newRoom);
    return Witch.CURSE_RESPONSE;
  }

  public override receiveGift(): string {
    return Witch.GIFT_RESPONSE;
  }
}
