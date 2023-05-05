import { expect, test, describe } from 'vitest';
import { Game } from '../Game';
import { Room } from '../environments/Room';

describe('Game', () => {
  test('Should create not over new game', () => {
    const game = new Game();

    expect(game.isGameOver()).toBe(false);
    expect(game.isWon()).toBe(false);
  });

  test('Should set game over', () => {
    const game = new Game();
    game.setGameOver();

    expect(game.isGameOver()).toBe(true);
  });

  test('Should set current room', () => {
    const game = new Game();
    const room = game.getCurrentRoom();

    expect(game.getCurrentRoom().getName()).toEqual(room.getName());
  });

  test('Should set custom current room', () => {
    const game = new Game();
    const room = new Room('customRoom');

    game.setCurrentRoom(room);

    expect(game.getCurrentRoom().getName()).toEqual(room.getName());
  });

  test('Should be won when current room is the winning one', () => {
    const game = new Game();
    const winningRoom = new Room('library');

    game.setCurrentRoom(winningRoom);

    expect(game.isWon()).toBe(true);
  });
});
