import { Game } from './Game';
import { Room } from './environments/Room';
import { IOConsole } from './IOConsole';

export class GameMain {
  private static readonly INIT_MESSAGE = '\n👋 Welcome to the dungeon!';
  private static readonly AVAILABLE_COMMANDS = ['move', 'pick', 'drop', 'help', 'quit'];
  private static LOGGER: IOConsole = new IOConsole();

  private game: Game;

  constructor() {
    this.game = new Game();
  }

  public async play(): Promise<void> {
    GameMain.LOGGER.showMessage(GameMain.INIT_MESSAGE);
    GameMain.LOGGER.showMessage(`🎮 Available commands: ${GameMain.AVAILABLE_COMMANDS.join(', ')}\n`);

    let action = '';
    while(action !== 'quit') {
      action = await GameMain.LOGGER.readInput('What do you want to do? Type one of the available commands \n');
      switch(action.toLowerCase()) {
        case 'move':
          const roomAvailableDirections = this.game.getCurrentRoom().getAvailableDirections();
          GameMain.LOGGER.showMessage(`\n↩️ Available directions: ${roomAvailableDirections.join(', ')}`);
          const direction = await GameMain.LOGGER.readInput('Which direction do you want to go? \n');
          if (direction) {
            this.move(direction);
          }
          break;
        case 'pick':
          const roomAvailableTools = this.game.getCurrentRoom().getAvailableTools();
          if (roomAvailableTools.length > 0) {
            GameMain.LOGGER.showMessage('\nℹ️ Available objects in the room:');
            GameMain.LOGGER.showMessage(roomAvailableTools.map(el => el.getDescription()).join(', '));
            const toolName = await GameMain.LOGGER.readInput('Which tool do you want to pick? \n');
            if (toolName) {
              this.pickTool(toolName);
            }
          } else {
            GameMain.LOGGER.showMessage('⚠️ There are no tools in the room!');
          }
          break;
        case 'drop':
          const playerTools = this.game.getPlayer().getBackpack().getTools();
          if (playerTools.length > 0) {
            GameMain.LOGGER.showMessage('\nℹ️ Available objects in the backpack:');
            GameMain.LOGGER.showMessage(playerTools.map(el => el.getDescription()).join(', '));
            const toolToDrop = await GameMain.LOGGER.readInput('Which tool do you want to drop? \n');
            if (toolToDrop) {
              this.dropTool(toolToDrop);
            }
          } else {
            GameMain.LOGGER.showMessage('⚠️ There are no tools in the backpack!');
          }
          break;
        case 'help':
          this.help();
          break;
        case 'quit':
          this.end();
          break;
        default:
          GameMain.LOGGER.showMessage('⚠️ Invalid answer!');
      }
    }
    GameMain.LOGGER.close();
  }

  private move(direction: string): void {
    let nextRoom: Room = this.game.getCurrentRoom().getAdjacentRoom(direction);
    if (!nextRoom) {
      GameMain.LOGGER.showMessage('⚠️ Invalid direction!');
    } else {
      this.game.setCurrentRoom(nextRoom);
      const points = this.game.getPlayer().getPoints();
      this.game.getPlayer().setPoints(points - 1);
    }
    GameMain.LOGGER.showMessage(this.game.getCurrentRoom().getDescription());

    if (this.game.isWon()) {
      GameMain.LOGGER.showMessage(`🎉 You won! You ended with ${this.game.getPlayer().getPoints()} points.`);
      GameMain.LOGGER.close();
    }
  }

  private pickTool(toolName: string): void {
    const roomTools = this.game.getCurrentRoom().getAvailableTools();
    const tool = roomTools.find((el) => el.getName() === toolName);
    if (tool) {
      this.game.getPlayer().getBackpack().addTool(tool);
      this.game.getCurrentRoom().removeTool(tool.getName());
      GameMain.LOGGER.showMessage(`ℹ️ You picked ${tool.getDescription()}`);
      GameMain.LOGGER.showMessage(this.game.getPlayer().getBackpack().getDescription());
    } else {
      GameMain.LOGGER.showMessage('⚠️ Invalid tool!');
    }
  }

  private dropTool(toolName: string): void {
    if (toolName) {
      const toolToDrop = this.game.getPlayer().getBackpack().getTools()
        .find((el) => el.getName() === toolName);
      if (!toolToDrop) {
        GameMain.LOGGER.showMessage('⚠️ Invalid tool!');
        return;
      }
      this.game.getPlayer().getBackpack().removeTool(toolToDrop.getName());
      this.game.getCurrentRoom().addTool(toolToDrop);
      GameMain.LOGGER.showMessage(this.game.getPlayer().getBackpack().getDescription());
    } else {
      GameMain.LOGGER.showMessage('⚠️ Invalid tool!');
    }
  }

  private help(): void {
    GameMain.LOGGER.showMessage(`\n🎮 Available commands: ${GameMain.AVAILABLE_COMMANDS.join(', ')}`);
    GameMain.LOGGER.showMessage(this.game.getCurrentRoom().getDescription());
    GameMain.LOGGER.showMessage(this.game.getPlayer().getDescription());
    GameMain.LOGGER.showMessage(this.game.getPlayer().getBackpack().getDescription());
  }

  private end(): void {
    GameMain.LOGGER.showMessage('🙏 Thanks for playing!');
    GameMain.LOGGER.close();
  }
}
