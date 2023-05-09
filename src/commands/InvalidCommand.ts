import { Command } from './Command';

export class InvalidCommand implements Command {
  private readonly name: string = 'invalid';
  public execute(): void {
    console.log('🤷‍ I don\'t understand that. Type \'help\' to see the available commands.');
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
