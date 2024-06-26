import { Command } from './Command';
import { GameMain } from '../GameMain';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { log } from '../utils/basic-logger';

export default class HelpCommand implements Command {
  private readonly name: string = COMMAND_NAME.help;
  public execute(): void {
    log.info(`\n${TEXT_MESSAGE.availableCommands}: ${GameMain.AVAILABLE_COMMANDS.join(', ')}`);
  }

  public setParameter(): void {
    // Do nothing
  }

  public getParameter(): string {
    return '';
  }

  public getName(): string {
    return this.name;
  }
}
