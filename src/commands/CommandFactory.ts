import { Command } from './Command';

export interface CommandFactory {
  createCommand(commandName: string): Command;
}
