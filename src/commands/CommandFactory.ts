import { Command } from './Command';
import { COMMAND_NAME } from '../static-data';

interface ICommandFactory {
  createCommand(commandName: string): Command | Promise<Command>;
}

export class CommandFactory implements ICommandFactory {

  private async loadComponent(name: string): Promise<any> {
    const module = await import(name);
    return module.default;
  }

  public async createCommand(instruction: string): Promise<Command> {
    const invalidCommandName =
        `${COMMAND_NAME.invalid.charAt(0).toUpperCase()}${COMMAND_NAME.invalid.slice(1)}Command`;
    try {
      const commandName = instruction.split(' ')[0];
      const param = instruction.split(' ')[1];

      let className;
      if (Object.values(COMMAND_NAME).indexOf(commandName) !== -1) {
        className = `${commandName.charAt(0).toUpperCase()}${commandName.slice(1)}Command`;
      } else {
        className = invalidCommandName;
      }

      const command = new (await this.loadComponent(`./${className}`))();
      command.setParameter(param);

      return command;
    } catch {
        return new (await this.loadComponent(invalidCommandName))();
    }
  }
}
