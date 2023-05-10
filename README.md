# Dungeon & Objects

The project is about creating a simple RPG game while learning OOP in typescript.

It's a game where the player has to explore a dungeon and find the exit.
The player can find objects in the dungeon and use them to defeat enemies or interact with the surroundings.

It is inspired from an idea of Michael Kolling and David J. Barnes and
from the Object-Oriented-Programming with Java course of the University of Roma Tre.

## Structure

The project is done through different versions. Each version is a step forward in the development of
the game. Each version is a branch of the master branch and the master branch contains the last
version of the game.

### Version 1
Simple version, with low maintainability and low extensibility.
It is a good starting point to understand the basic concepts of OOP.

### Version 2

**One of the problems to solve**:
`Game` and `DungeonObjects` classes are too big and have too many responsibilities.
This is a problem because it makes the code difficult to maintain and extend.

---

Starting from version 1, add functionalities to the game:

- Increase code cohesion and reduce code coupling: create a new class `DungeonMap` that will handle the creation of the map, removing this responsibility from the `Game` class.
  - The game map has an entry point `InitialRoom` and an exit point `WinningRoom`.
  - The `DungeonMap` class has an `init()` method that creates the map and returns the entry point.
- Implement `removeTool()` method in the `Room` class.
- Add `Backpack` class with responsibilities:
  - Store objects
  - Add objects
  - Remove objects
  - Get an object
  - Check if an object is in the backpack
  - Check if the backpack is full/empty [max weight]
  - Get the number of objects in the backpack
- Add `Player` class with responsibilities:
  - Handle the player's points
  - Handle the player's backpack
- Add new game actions:
  - `pick` object by name
  - `drop` object by name
- Add `IOConsole` class that will handle the input/output of the game. Methods:
  - `showMessage()`
  - `readInput()` (returns a string)
- Add unit tests. At least 3 (if makes sense) unit tests for `Room`, `Game`, `Player`, `Backpack` and `DungeonMap` classes.

### Version 3
**One of the problems to solve**:
`GameMain` class is handling the logic of the commands and actions of the game.
This is a problem because it's difficult to add new commands and the class could become too big.

---

Starting from version 2, add functionalities to the game:

- Refactor the code extracting the logic of the commands and actions of the game:
  - Create a `Command` interface with a `execute(game: Game)` method.
  - Create a `CommandFactory` interface and a `CommandFactory` that will handle the creation of the commands (for now if-else statements).
  - Create a class for every command the game supports.
  - Write unit tests for the new classes.
- Implement `InputOutput` interface, from which `IOConsole` class will inherit and create that class only from the program's `main()` method. This way there will be more flexibility in the future to change the input/output of the game.
- Add a new room in the game, the `MagicRoom`, with the following characteristics:
  - After N times the player drops an object in the room, the room will behave magically and will reverse the object name and double up the object weight.
  - The room will have a `magicCounter` attribute that will keep track of the number of times the player drops an object in the room.
  - The room will have a `magicThreshold` attribute that will be the number of times the player has to drop an object in the room before it behaves magically.
  - When the room doesn't behave magically, it will behave like a normal room.
- Add a new room in the game, the `DarkRoom`, with the following characteristics:
  - The room will have a `lightTool` string attribute that will be the name of the object that will light up the room.
  - If in the room there is a `lightTool` object, the room will behave normally, otherwise it will be dark and the room description will be different.
  - The `getDescription()` method will return a different description if the room is dark or not.
  - The `lightTool` attribute will be set in the constructor.
- Add a new room in the game, the `BlockedRoom`, with the following characteristics:
  - The room will have a `unlockTool` string attribute that will be the name of the object that will unlock the blocked direction in the room.
  - The room will have a `blockedDirection` string attribute that will block the player from going in that direction if not in possession of the `unlockTool`.
  - The `getDescription()` method will return a different description if the room is blocked or not.
  - The `getAdjacentRoom()` method in the `blockedDirection` will return a reference to self if the `unlockTool` is not in the room.
  - The `blockedDirection` and the `unlockTool` attributes will be set in the constructor.
- All the rooms should extend the basic `Room` class.
- Write unit tests for the new rooms.
- Add `IOSimulator` class that implements `InputOutput` interface. It should take a list of instructions and automatically execute them without user input. It could be useful for acceptance testing.

### Version 4

- Refactor the commands creation using dynamic class loading.
