import { CommandFactory } from './CommandFactory';
import { Command } from './Command';
import { MoveCommand } from './MoveCommand';
import { HelpCommand } from './HelpCommand';
import { LookCommand } from './LookCommand';
import { QuitCommand } from './QuitCommand';
import { PickCommand } from './PickCommand';
import { DropCommand } from './DropCommand';
import { InvalidCommand } from './InvalidCommand';
import { COMMAND_NAME } from '../static-data';

export class CommandFactoryAccordion implements CommandFactory {
  public createCommand(instruction: string): Command {
    const commandName = instruction.split(' ')[0];
    const param = instruction.split(' ')[1];

    let command;

    if (commandName === COMMAND_NAME.move) {
      command = new MoveCommand();
    } else if (commandName === COMMAND_NAME.help) {
      command = new HelpCommand();
    } else if (commandName === COMMAND_NAME.look) {
      command = new LookCommand();
    } else if (commandName === COMMAND_NAME.pick) {
      command = new PickCommand();
    } else if (commandName === COMMAND_NAME.drop) {
      command = new DropCommand();
    } else if (commandName === COMMAND_NAME.quit) {
      command = new QuitCommand();
    } else {
      command = new InvalidCommand();
    }

    command.setParameter(param);
    return command;
  }
}
