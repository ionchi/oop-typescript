import type { InputOutput } from './InputOutput';
import { Game } from './Game';
import { CommandFactory } from './commands/CommandFactory';
import { COMMAND_NAME, TEXT_MESSAGE } from './utils/static-data';
import { Command } from './commands/Command';

export class GameMain {
  public static readonly AVAILABLE_COMMANDS = [
    `${COMMAND_NAME.move} <direction>`,
    `${COMMAND_NAME.pick} <object>`,
    `${COMMAND_NAME.drop} <object>`,
    `${COMMAND_NAME.talk} <character>`,
    `${COMMAND_NAME.interact} <character>`,
    `${COMMAND_NAME.gift} <object>`,
    COMMAND_NAME.look,
    COMMAND_NAME.help,
    COMMAND_NAME.quit
  ];
  private readonly logger: InputOutput;

  private readonly game: Game;

  constructor(logger: InputOutput, mapPath?: string) {
    this.game = new Game(mapPath);
    this.logger = logger;
  }

  public async play(): Promise<void> {
    this.logger.showMessage(
      TEXT_MESSAGE.welcomeMessage,
      'success'
    );
    this.logger.showMessage(
      `${TEXT_MESSAGE.availableCommands}: ${GameMain.AVAILABLE_COMMANDS.join(', ')}\n`,
      'secondary'
    );

    try {
      while(!this.game.isGameOver()) {
        const instruction = await this.logger.readInput(
          `${TEXT_MESSAGE.initQuestion} \n`
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
    let commandToExecute: Command;
    const factory = new CommandFactory();

    commandToExecute = await factory.createCommand(instruction);
    if (commandToExecute) {
      commandToExecute.execute(this.game);
    }

    if (this.game.isWon()) {
      this.logger.showMessage(
        `🎉 You won! You ended with ${this.game.getPlayer().getPoints()} points.`,
        'success'
      );
    }
    if (!this.game.getPlayer().isAlive()) {
      this.logger.showMessage(TEXT_MESSAGE.died, 'error');
    }
    return this.game.isGameOver();
  }
}
