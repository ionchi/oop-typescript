import { Command } from './Command';
import { COMMAND_NAME, TEXT_MESSAGE } from '../utils/static-data';

export default class InvalidCommand implements Command {
  private readonly name: string = COMMAND_NAME.invalid;
  public execute(): void {
    console.log(TEXT_MESSAGE.invalidCommand);
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
