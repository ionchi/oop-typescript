import { Game } from './Game';
import { CommandFactoryAccordion } from './commands/CommandFactoryAccordion';
import { IO } from './IO';

export class GameMain {
  private static readonly INIT_MESSAGE = '\n👋 Welcome to the dungeon!';
  public static readonly AVAILABLE_COMMANDS = ['move <direction>', 'pick <object>', 'drop <object>', 'look', 'help', 'quit'];
  private readonly logger: IO;

  private readonly game: Game;

  constructor(logger: IO) {
    this.game = new Game();
    this.logger = logger;
  }

  public async play(): Promise<void> {
    this.logger.showMessage(GameMain.INIT_MESSAGE);
    this.logger.showMessage(`🎮 Available commands: ${GameMain.AVAILABLE_COMMANDS.join(', ')}\n`);

    let instruction = '';
    while(!this.game.isGameOver()) {
      instruction = await this.logger.readInput('What do you want to do? Type one of the available commands \n');
      this.executeCommand(instruction.toLowerCase());
    }
    this.logger.close();
  }

  private executeCommand(instruction: string): boolean {
    let commandToExecute;
    const factory = new CommandFactoryAccordion();

    commandToExecute = factory.createCommand(instruction);
    if (commandToExecute) {
      commandToExecute.execute(this.game);
    }

    if (this.game.isWon()) {
      this.logger.showMessage(`🎉 You won! You ended with ${this.game.getPlayer().getPoints()} points.`);
    }
    if (!this.game.getPlayer().isAlive()) {
      this.logger.showMessage('😵 You died!');
    }
    return this.game.isGameOver();
  }
}
