import * as chalk from 'chalk';
export const log = {
  info: (message: string) => console.log(chalk.blue(message)),
  error: (message: string) => console.log(chalk.red(message)),
  success: (message: string) => console.log(chalk.green(message)),
  secondary: (message: string) => console.log(chalk.grey(message)),
  default: (message: string) => console.log(chalk.white(message))
};
