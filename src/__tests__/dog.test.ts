import { describe, test, expect } from 'vitest';
import { Dog } from '../characters/Dog';

describe('Dog', () => {
    test('Should create a dog character, with a name and a welcome message', () => {
        const dog = new Dog('dog', 'woof');

        expect(dog.getName()).toBe('dog');
        expect(dog.getWelcomeMessage()).toBe('woof');
    });
});
