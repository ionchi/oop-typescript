import * as readline from 'node:readline/promises';

export const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
