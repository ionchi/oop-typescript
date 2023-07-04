import { Command } from './Command';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';
import { log } from '../utils/basic-loader';

export default class InvalidCommand implements Command {
  private readonly name: string = COMMAND_NAME.invalid;
  public execute(): void {
    log.error(TEXT_MESSAGE.invalidCommand);
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
