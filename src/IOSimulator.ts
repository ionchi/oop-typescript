import * as console from 'console';
import * as process from 'process';
import type { InputOutput } from './InputOutput';

export class IOSimulator implements InputOutput {
  private readonly inputInstructions: string[];
  private currentInstructionIndex: number;
  constructor(instructions: string[]) {
    this.inputInstructions = instructions;
    this.currentInstructionIndex = 0;
  }

  private hasNextInstruction(): boolean {
    return this.inputInstructions.length > this.currentInstructionIndex;
  }

  private getInstruction(): string {
    const instruction = this.inputInstructions[this.currentInstructionIndex];
    if (this.hasNextInstruction()) {
      this.currentInstructionIndex++;
    }
    return instruction;
  }

  public showMessage(message: string) {
    console.log(message);
  }

  public async readInput(): Promise<string> {
    return new Promise((resolve, reject) => {
      const instruction = this.getInstruction();
      console.log(`--> [${this.currentInstructionIndex}] ${instruction}`);
      setTimeout(() => {
        if (instruction) {
          resolve(instruction);
        } else {
          reject('Error');
        }
      }, 250);
    });
  }

  public close() {
    process.exit(0);
  }
}
