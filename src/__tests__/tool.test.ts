import { describe, expect, test } from 'vitest';
import { Tool } from '../tools/Tool';

describe('Tool', () => {
  test('Should create a tool with name and weight', () => {
    const tool = new Tool('Axe', 2);

    expect(tool.getName()).toBe('Axe');
    expect(tool.getWeight()).toBe(2);
  });
});
