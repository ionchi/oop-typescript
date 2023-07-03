import { Game } from '../Game';
import { Tool } from '../tools/Tool';

export abstract class Character {
    private readonly name: string;
    private readonly welcomeMessage: string;
    private hasBeenWelcomed: boolean;

    constructor(name: string, welcomeMessage: string) {
        this.name = name;
        this.welcomeMessage = welcomeMessage;
        this.hasBeenWelcomed = false;
    }

    public getName(): string {
        return this.name;
    }

    public getWelcomeMessage(): string {
        return this.welcomeMessage;
    }

    public getHasBeenWelcomed(): boolean {
        return this.hasBeenWelcomed;
    }

    public abstract receiveGift(game: Game, gift: Tool): string

    public talk(): string {
        let message: string = `Hello, my name is ${this.name}.`;
        if (!this.hasBeenWelcomed) {
            message += ` ${this.welcomeMessage}`;
            this.hasBeenWelcomed = true;
        } else {
            message += 'We\'ve already talked.';
        }
        return message;
    }

    public abstract interact(game: Game): string;
}
