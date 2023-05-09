export interface IO {
  showMessage(message: string): void;
  readInput(question: string): Promise<string> | string;
  close(): void;
}
