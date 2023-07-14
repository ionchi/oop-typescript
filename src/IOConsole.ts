import * as readline from 'node:readline/promises';
import * as process from 'process';
import type { InputOutput } from './InputOutput';
import { log } from './utils/basic-logger';

export class IOConsole implements InputOutput {
  private prompt: readline.Interface;

  constructor() {
    this.prompt = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public showMessage(message: string, color?: string): void {
    const col = color || 'default';
    log[col](message);
  }

  public async readInput(question: string): Promise<string> {
    const answer = await this.prompt.question(`❔ ${question}`);
    return answer.trim();
  }

  public close(): void {
    this.prompt.close();
    process.exit(0);
  }
}
