export interface InputOutput {
  showMessage(message: string): void;
  readInput(question: string): Promise<string> | string;
  close(): void;
}
