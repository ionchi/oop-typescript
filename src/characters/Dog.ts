import { Game } from '../Game';
import { Character } from './Character';
import { TEXT_MESSAGE } from '../utils/static-data';
import { Tool } from '../tools/Tool';
import { Player } from '../player/Player';

export class Dog extends Character {
  private static readonly GIFT_MESSAGE = 'Woof! There is a new tool for you in the room!';
  private static readonly DESIRED_GIFT: string = 'bone';

  public interact(game: Game): string {
    const currentPlayer = this.getCurrentPlayer(game);
    return this.attackPlayer(currentPlayer);
  }

  private getCurrentPlayer(game: Game): Player {
    return game.getPlayer();
  }

  private attackPlayer(player: Player): string {
    player.setPoints(player.getPoints() - 1);
    return TEXT_MESSAGE.dogBadInteraction;
  }

  public receiveGift(game: Game, tool: Tool): string {
    return tool.getName() === Dog.DESIRED_GIFT
      ? this.receiveDesiredGift(game, new Tool('lantern', 3))
      : this.receiveUndesiredGift(game);
  }

  private receiveDesiredGift(game: Game, gift: Tool): string {
    game.getCurrentRoom().addTool(gift);
    return Dog.GIFT_MESSAGE;
  }

  private receiveUndesiredGift(game: Game): string {
    const currentPlayer = this.getCurrentPlayer(game);
    return this.attackPlayer(currentPlayer);
  }
}
