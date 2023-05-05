import { expect, test, describe } from 'vitest';
import { Backpack } from '../player/Backpack';
import { Tool } from '../tools/Tool';

describe('Backpack', () => {
  test('Should create a backpack with a max weight', () => {
    const backpack = new Backpack(20);
    const backpackDefaultWeight = new Backpack();
    expect(backpack.getMaxWeight()).toBe(20);
    expect(backpackDefaultWeight.getMaxWeight()).toBe(10);
  });

  test('Should add a tool to the backpack and display correct', () => {
    const backpack = new Backpack();
    const tool = new Tool('tool', 5);

    expect(backpack.addTool(tool)).toBe(true);
    expect(backpack.getWeight()).toBe(5);
    expect(backpack.hasTool(tool.getName())).toBe(true);
  });

  test('Should remove a tool from the backpack and display correct weight', () => {
    const backpack = new Backpack();
    const tool = new Tool('tool', 5);

    backpack.addTool(tool);

    expect(backpack.removeTool(tool.getName())).toBe(true);
    expect(backpack.getWeight()).toBe(0);
    expect(backpack.hasTool(tool.getName())).toBe(false);
    expect(backpack.isEmpty()).toBe(true);
  });

  test('Should not add a tool to the backpack if exceeds max weight', () => {
    const backpack = new Backpack(4);
    const tool = new Tool('tool', 5);

    expect(backpack.addTool(tool)).toBe(false);
    expect(backpack.getWeight()).toBe(0);
    expect(backpack.hasTool(tool.getName())).toBe(false);
    expect(backpack.isEmpty()).toBe(true);
  });

  test('Should not remove a tool not in the backpack', () => {
    const backpack = new Backpack();

    expect(backpack.removeTool('tool')).toBe(false);
  });

  test('Should not add a tool already in the backpack', () => {
    const backpack = new Backpack();
    const tool = new Tool('tool', 5);

    backpack.addTool(tool);

    expect(backpack.addTool(tool)).toBe(false);
  });

  test('Should add multiple tools and display correct weight', () => {
    const backpack = new Backpack();
    const tool1 = new Tool('tool1', 5);
    const tool2 = new Tool('tool2', 3);

    backpack.addTool(tool1);
    backpack.addTool(tool2);

    expect(backpack.getWeight()).toBe(8);
    expect(backpack.hasTool(tool1.getName())).toBe(true);
    expect(backpack.hasTool(tool2.getName())).toBe(true);
  });
});
