import { Tool } from '../tools/Tool';

export class Backpack {
  private static readonly MAX_WEIGHT = 10;
  private readonly tools: Tool[];
  private toolsNumber: number;
  private readonly maxWeight: number;

  constructor(maxWeight?: number) {
    this.tools = new Array(10);
    this.toolsNumber = 0;
    this.maxWeight = maxWeight || Backpack.MAX_WEIGHT;
  }

  public addTool(tool: Tool): boolean {
    if (this.hasTool(tool.getName())) {
      return false;
    }
    if (this.getWeight() + tool.getWeight() >= this.maxWeight || this.toolsNumber === 10) {
      return false;
    }
    this.tools[this.toolsNumber] = tool;
    this.toolsNumber++;
    return true;
  }

  public removeTool(toolName: string): boolean {
    for (let i = 0; i < this.toolsNumber; i++) {
      if (this.tools[i]?.getName() === toolName) {
        this.tools[i] = null;
        this.toolsNumber--;
        return true;
      }
    }
    return false;
  }

  public hasTool(toolName: string): boolean {
    for (let i = 0; i < this.toolsNumber; i++) {
      if (this.tools[i]?.getName() === toolName) {
        return true;
      }
    }
    return false;
  }

  public getMaxWeight(): number {
    return this.maxWeight;
  }

  public getWeight(): number {
    let weight = 0;
    for (let i = 0; i < this.toolsNumber; i++) {
      weight += this.tools[i]?.getWeight() || 0;
    }
    return weight;
  }

  public isEmpty(): boolean {
    return this.toolsNumber === 0;
  }

  public getTools(): Tool[] {
    return this.tools.filter(tool => !!tool?.getName());
  }

  public getDescription(): string {
    let description = '#####\n';
    const availableTools = this.getTools();
    description += `🎒 Backpack content (${this.getWeight()}kg/${this.getMaxWeight()}kg): \n`;
    description += `${availableTools.length ? availableTools.map(el =>
      el.getDescription()).join(', ') : '-'}\n`;
    description += '#####';
    return description;
  }
}
