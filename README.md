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

- [x] Increase code cohesion and reduce code coupling: create a new class `DungeonStatic` that will handle the creation of the map, removing this responsibility from the `Game` class.
  - The game map has an entry point `InitialRoom` and an exit point `WinningRoom`.
  - The `DungeonStatic` class has an `init()` method that creates the map and returns the entry point.
- [x] Implement `removeTool()` method in the `Room` class.
- [x] Add `Backpack` class with responsibilities:
  - Store objects
  - Add objects
  - Remove objects
  - Get an object
  - Check if an object is in the backpack
  - Check if the backpack is full/empty [max weight]
  - Get the number of objects in the backpack
- [x] Add `Player` class with responsibilities:
  - Handle the player's points
  - Handle the player's backpack
- [x] Add new game actions:
  - `pick` object by name
  - `drop` object by name
- [x] Add `IOConsole` class that will handle the input/output of the game. Methods:
  - `showMessage()`
  - `readInput()` (returns a string)
- [x] Add unit tests. At least 3 (if it makes sense) unit tests for `Room`, `Game`, `Player`, `Backpack` and `DungeonStatic` classes.

### Version 3
**One of the problems to solve**:
`GameMain` class is handling the logic of the commands and actions of the game.
This is a problem because it's difficult to add new commands and the class could become too big.

---

Starting from version 2, add functionalities to the game:

- [x] Refactor the code extracting the logic of the commands and actions of the game:
  - Create a `Command` interface with a `execute(game: Game)` method.
  - Create a `CommandFactory` interface and a `CommandFactory` that will handle the creation of the commands (for now if-else statements).
  - Create a class for every command the game supports.
  - Write unit tests for the new classes.
- [x] Implement `InputOutput` interface, from which `IOConsole` class will inherit and create that class only from the program's `main()` method. This way there will be more flexibility in the future to change the input/output of the game.
- [x] Add a new room in the game, the `MagicRoom`, with the following characteristics:
  - After N times the player drops an object in the room, the room will behave magically and will reverse the object name and double up the object weight.
  - The room will have a `magicCounter` attribute that will keep track of the number of times the player drops an object in the room.
  - The room will have a `magicThreshold` attribute that will be the number of times the player has to drop an object in the room before it behaves magically.
  - When the room doesn't behave magically, it will behave like a normal room.
- [x] Add a new room in the game, the `DarkRoom`, with the following characteristics:
  - The room will have a `lightTool` string attribute that will be the name of the object that will light up the room.
  - If in the room there is a `lightTool` object, the room will behave normally, otherwise it will be dark and the room description will be different.
  - The `getDescription()` method will return a different description if the room is dark or not.
  - The `lightTool` attribute will be set in the constructor.
- [x] Add a new room in the game, the `BlockedRoom`, with the following characteristics:
  - The room will have a `unlockTool` string attribute that will be the name of the object that will unlock the blocked direction in the room.
  - The room will have a `blockedDirection` string attribute that will block the player from going in that direction if not in possession of the `unlockTool`.
  - The `getDescription()` method will return a different description if the room is blocked or not.
  - The `getAdjacentRoom()` method in the `blockedDirection` will return a reference to self if the `unlockTool` is not in the room.
  - The `blockedDirection` and the `unlockTool` attributes will be set in the constructor.
- [x] All the rooms should extend the basic `Room` class.
- [x] Write unit tests for the new rooms.
- [x] Add `IOSimulator` class that implements `InputOutput` interface. It should take a list of instructions and automatically execute them without user input. It could be useful for acceptance testing.

### Version 4

- [x] Refactor the commands creation using dynamic class loading.
- [x] Introduce characters in the game.
  - There can be one character per room.
  - Every character has a name and a welcome phrase.
  - Every character answers with the welcome phrase when the player writes `talk` to the character.
  - Every character has a different behavior when the player writes `interact` to the character.
    - The `dog` will bite the player and the player will lose 1 point.
    - The `witch` will teleport the player to an adjacent room. If the player has talked to the witch before, the destination room will be one with more objects in it, otherwise it will be the one with fewer objects in it.
    - The `wizard` will give the player a random object.
- [x] Add `GiftCommand` and a `recieveGift()` method in the `Character` class through which the player can gift an object to the character, specifying the name of on tool the player has in the backpack.
    - For a `dog` character, if the gift is a `bone`, the dog will throw an object in the room. If it's something else, the dog will bite the player. (-1 point)
    - For a `witch` character, she will take the object doing nothing in return, just laughing.
    - For a `wizard` character, he will halve the weight of the object and throw it in the room.
- [x] Extract all the static properties and put them in a config file. E.g. initial points, max weight, etc.
- [x] Refactor the directions as an enum - they are limited, and they are not going to change, so it's better to use an enum.
- [x] Write unit tests for the new classes.
- [x] Add a dungeon uploader from a file given by the user.
  - The file should be a JSON with a list of rooms (with their adjacent rooms), a list of tools and a list of characters from a specified list.
  - At startup, the game should ask the user if he wants to upload a dungeon from a file or use the default one. 

<details>
  <summary>The file format should be:</summary>

  Allowed characters type: `dog`, `witch`, `wizard`.

  Allowed rooms type: `normal`, `magic`, `dark`, `blocked`.

  Allowed directions name: `north`, `south`, `east`, `west`.

  ```json
  {
    "tools": [
      {
        "name": "lantern",
        "weight": 3,
        "room": "room N2"
      },
      {
        "name": "bone",
        "weight": 1,
        "room": "hall"
      },
      {
        "name": "key",
        "weight": 1,
        "room": "room N1"
      }
    ],
    "characters": [
      {
        "type": "dog",
        "name": "Rex",
        "welcomeMessage": "Woof!",
        "room": "hall"
      },
      {
        "type": "witch",
        "name": "Hex",
        "welcomeMessage": "Bibbidi bobbidi boo!",
        "room": "room N1"
      },
      {
        "type": "wizard",
        "name": "Merlin",
        "welcomeMessage": "Abracadabra!",
        "room": "lab"
      }
    ],
    "rooms": [
      {
        "name": "hall",
        "type": "blocked",
        "isInitRoom": true,
        "specs": {
          "blockedDirection": "north",
          "unlockTool": "key"
        },
        "directions": {
          "north": "library",
          "east": "room N1",
          "south": "room N2",
          "west": "lab"
        }
      },
      {
        "name": "room N1",
        "type": "dark",
        "specs": {
          "lightSource": "lantern"
        },
        "directions": {
          "west": "hall"
        }
      },
      {
        "name": "room N2",
        "type": "normal",
        "directions": {
          "north": "hall"
        }
      },
      {
        "name": "library",
        "type": "normal",
        "isWinningRoom": true,
        "directions": {
          "south": "hall"
        }
      },
      {
        "name": "lab",
        "type": "magic",
        "specs": {
          "magicThreshold": 3
        },
        "directions": {
          "east": "hall"
        }
      }
    ]
  }
  ```
</details>


