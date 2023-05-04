export class Tool {
  private readonly name: string;
  private readonly weight: number;

  constructor(name: string, weight: number) {
    this.name = name;
    this.weight = weight;
  }

  public getName(): string {
    return this.name;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getDescription(): string {
    return `${this.name} (${this.weight} kg)`;
  }
}
