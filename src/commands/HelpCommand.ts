import { Command } from './Command';
import { GameMain } from '../GameMain';

export class HelpCommand implements Command {
  private readonly name: string = 'help';
  public execute(): void {
    console.log(`\n🎮 Available commands: ${GameMain.AVAILABLE_COMMANDS.join(', ')}`);
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
