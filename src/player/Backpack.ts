import { Tool } from '../tools/Tool';
import config from '../utils/config';

export class Backpack {
  private static readonly MAX_WEIGHT = config.maxBackpackWeight || 10;
  private readonly tools: Tool[];
  private readonly maxWeight: number;

  constructor(maxWeight?: number) {
    this.maxWeight = maxWeight || Backpack.MAX_WEIGHT;
    this.tools = [];
  }

  public addTool(tool: Tool): boolean {
    if (this.hasTool(tool.getName())) {
      return false;
    }
    if (this.getWeight() + tool.getWeight() >= this.maxWeight) {
      return false;
    }
    this.tools.push(tool);
    return true;
  }

  public removeTool(toolName: string): boolean {
    for (let i = 0; i < this.tools.length; i++) {
      if (this.tools[i]?.getName() === toolName) {
        this.tools.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public hasTool(toolName: string): boolean {
    for (let i = 0; i < this.tools.length; i++) {
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
    for (let i = 0; i < this.tools.length; i++) {
      weight += this.tools[i]?.getWeight() || 0;
    }
    return weight;
  }

  public isEmpty(): boolean {
    return this.tools.length === 0;
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
