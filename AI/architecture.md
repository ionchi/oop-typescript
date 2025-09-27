### What we have now (Architecture and Behavior)

- Core entry points
  - `index.ts` starts the CLI game using `IOConsole` and `GameMain`.
  - `GameMain` orchestrates a loop: prints messages, asks for input, builds a command, executes it on the game, and checks end conditions.
```26:41:/src/GameMain.ts
  public async play(): Promise<void> {
    this.logger.showMessage(TEXT_MESSAGE.welcomeMessage);
    this.logger.showMessage(`${TEXT_MESSAGE.availableCommands}: ${GameMain.AVAILABLE_COMMANDS.join(', ')}\n`);

    try {
      while(!this.game.isGameOver()) {
        const instruction = await this.logger.readInput(
            `${TEXT_MESSAGE.initQuestion} \n`
        );
        await this.executeCommand(instruction.toLowerCase());
      }
    } catch {
      this.logger.close();
    } finally {
      this.logger.close();
    }
  }
```
- IO abstraction for CLI
  - `InputOutput` interface for output and synchronous/promise input.
  - `IOConsole` implements CLI via Node `readline`.
```15:27:/src/IOConsole.ts
  public showMessage(message: string): void {
    console.log(message);
  }

  public async readInput(question: string): Promise<string> {
    const answer = await this.prompt.question(`❔ ${question}`);
    return answer.trim();
  }

  public close(): void {
    this.prompt.close();
    process.exit(0);
  }
```
- Domain/game model
  - `Game` holds `DungeonMap`, `currentRoom`, `Player`, win/over logic.
  - `DungeonMap` constructs rooms, items, and characters.
  - `Room`, `Player`, `Backpack`, `Tool` encapsulate state and provide descriptions for CLI.
- Commands
  - `CommandFactory` creates commands from string instructions; uses dynamic import and sets param.
  - Commands mutate `Game` and print to console directly (tight coupling to console output).
```9:29:/src/commands/MoveCommand.ts
  public execute(game: Game): void {
    const currentRoom = game.getCurrentRoom();
    let nextRoom = null;

    if (!this.direction) {
      console.log(TEXT_MESSAGE.invalidDirection);
      return;
    }

    nextRoom = currentRoom.getAdjacentRoom(this.direction);

    if (!nextRoom) {
      console.log(TEXT_MESSAGE.invalidDirection);
      return;
    }

    game.setCurrentRoom(nextRoom);
    console.log(game.getCurrentRoom().getName());
    const points = game.getPlayer().getPoints();
    game.getPlayer().setPoints(points - 1);
  }
```
```5:16:/src/commands/PickCommand.ts
  public execute(game: Game): void {
    const roomTools = game.getCurrentRoom().getAvailableTools();
    const tool = roomTools.find((el) => el.getName() === this.item);
    if (tool) {
      game.getPlayer().getBackpack().addTool(tool);
      game.getCurrentRoom().removeTool(tool.getName());
      console.log(`ℹ️ You picked ${tool.getDescription()}`);
      console.log(game.getPlayer().getBackpack().getDescription());
    } else {
      console.log(TEXT_MESSAGE.invalidTool);
    }
  }
```
- Characters and interactions
  - `Dog`, `Witch`, `Wizard` implement `Character.interact(game)` and often produce messages or change state.
- Static messages and command names in `static-data.ts`.
