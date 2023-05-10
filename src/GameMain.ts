import type { InputOutput } from './InputOutput';
import { Game } from './Game';
import { CommandFactory } from './commands/CommandFactory';
import { TEXT_MESSAGE } from './static-data';

export class GameMain {
  private static readonly INIT_MESSAGE = `\n${TEXT_MESSAGE.welcomeMessage}`;
  public static readonly AVAILABLE_COMMANDS = ['move <direction>', 'pick <object>', 'drop <object>', 'look', 'help', 'quit'];
  private readonly logger: InputOutput;

  private readonly game: Game;

  constructor(logger: InputOutput) {
    this.game = new Game();
    this.logger = logger;
  }

  public async play(): Promise<void> {
    this.logger.showMessage(GameMain.INIT_MESSAGE);
    this.logger.showMessage(`${TEXT_MESSAGE.availableCommands}: ${GameMain.AVAILABLE_COMMANDS.join(', ')}\n`);

    try {
      while(!this.game.isGameOver()) {
        const instruction = await this.logger.readInput(
            'What do you want to do? Type one of the available commands \n'
        );
        await this.executeCommand(instruction.toLowerCase());
      }
    } catch {
      this.logger.close();
    } finally {
      this.logger.close();
    }
  }

  private async executeCommand(instruction: string): Promise<boolean> {
    let commandToExecute;
    const factory = new CommandFactory();

    commandToExecute = await factory.createCommand(instruction);
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
