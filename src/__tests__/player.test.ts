import { expect, test, describe } from 'vitest';
import { Player } from '../player/Player';

describe('Player', () => {
  test('Should create a player with default points and name', () => {
    const player = new Player();
    expect(player.getName()).toBe('Player');
    expect(player.getPoints()).toBe(20);
  });

  test('Should create a player with custom name', () => {
    const player = new Player('Custom Name');
    expect(player.getName()).toBe('Custom Name');
  });

  test('Should change user points', () => {
    const player = new Player();
    player.setPoints(10);

    expect(player.getPoints()).toBe(10);
  });
});
