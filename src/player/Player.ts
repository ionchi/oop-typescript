import { Backpack } from './Backpack';

export class Player {
  private static readonly INIT_POINTS = 20;
  private static readonly DEFAULT_NAME = 'Player';
  private readonly name: string;
  private readonly backpack: Backpack;
  private points: number;

  constructor(name?: string) {
    this.name = name || Player.DEFAULT_NAME;
    this.backpack = new Backpack();
    this.points = Player.INIT_POINTS;
  }

  public getName(): string {
    return this.name;
  }

  public getPoints(): number {
    return this.points;
  }

  public setPoints(points: number): void {
    this.points = points;
  }

  public getBackpack(): Backpack {
    return this.backpack;
  }

  public getDescription(): string {
    return `🧍 ${this.name} has ${this.points} points and ${this.backpack.getWeight()}kg in the backpack`;
  }
}
