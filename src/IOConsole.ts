import * as readline from 'node:readline/promises';
import * as process from 'process';
import { IO } from './IO';

export class IOConsole implements IO {
  private prompt: readline.Interface;

  constructor() {
    this.prompt = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public showMessage(message: string): void {
    console.log(`${message}`);
  }

  public async readInput(question: string): Promise<string> {
    const answer = await this.prompt.question(`❔ ${question}`);
    return answer.trim();
  }

  public close(): void {
    this.prompt.close();
    process.exit(1);
  }
}
