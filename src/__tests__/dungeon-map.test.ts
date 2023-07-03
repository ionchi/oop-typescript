import { expect, test, describe } from 'vitest';
import { DungeonStatic } from '../environments/DungeonStatic';

describe('DungeonMap', () => {
  test('Should create with default init and winning room', () => {
    const dungeonMap = new DungeonStatic();

    expect(dungeonMap.getInitRoom().getName()).toBe('hall');
    expect(dungeonMap.getWinningRoom().getName()).toBe('library');
  });
});
