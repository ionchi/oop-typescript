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

