import { expect, test, describe } from 'vitest';
import { DungeonMap } from '../environments/DungeonMap';

describe('DungeonMap', () => {
  test('Should create with default init and winning room', () => {
    const dungeonMap = new DungeonMap();

    expect(dungeonMap.getInitRoom().getName()).toBe('hall');
    expect(dungeonMap.getWinningRoom().getName()).toBe('library');
  });
});
