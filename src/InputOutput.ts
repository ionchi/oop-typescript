export interface InputOutput {
  showMessage(message: string, color?: string): void;
  readInput(question: string): Promise<string> | string;
  close(): void;
}
