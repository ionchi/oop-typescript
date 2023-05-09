import { CommandFactory } from './CommandFactory';
import { Command } from './Command';
import { MoveCommand } from './MoveCommand';
import { HelpCommand } from './HelpCommand';
import { LookCommand } from './LookCommand';
import { QuitCommand } from './QuitCommand';
import { PickCommand } from './PickCommand';
import { DropCommand } from './DropCommand';
import { InvalidCommand } from './InvalidCommand';

export class CommandFactoryAccordion implements CommandFactory {
  public createCommand(instruction: string): Command {
    const commandName = instruction.split(' ')[0];
    const param = instruction.split(' ')[1];

    let command;

    if (commandName === 'move') {
      command = new MoveCommand();
    } else if (commandName === 'help') {
      command = new HelpCommand();
    } else if (commandName === 'look') {
      command = new LookCommand();
    } else if (commandName === 'pick') {
      command = new PickCommand();
    } else if (commandName === 'drop') {
      command = new DropCommand();
    } else if (commandName === 'quit') {
      command = new QuitCommand();
    } else {
      command = new InvalidCommand();
    }

    command.setParameter(param);
    return command;
  }
}
