### Proposed UI architecture (high level)

- Keep the domain logic intact but decouple side-effectful console printing from commands. Introduce a small “output port” so commands report messages back to the UI.
- Replace dynamic imports in `CommandFactory` with a static registry to make bundling predictable for the browser.
- Add a `GameController` façade exposing:
  - `submitInstruction(input: string): GameUpdate`
  - `getState(): GameState` (room, player, backpack, available actions, messages)
- Build a Vue 3 (Composition API) SPA (Vite + TypeScript) that renders the current state and provides both command-line input and clickable actions (buttons for directions, pick/drop, talk/interact).
- No change to game rules/map; only refactor for IO and factory to support web.

#### Visual design goals and libraries

- Use CSS variables (light/dark) for theming. Optionally Tailwind CSS for fast iteration.
- Use `@vueuse/motion` for component/page transitions; optionally `gsap` for advanced sequences.
- For isometric view, start with CSS transforms; optionally allow a `pixi.js` renderer behind a feature flag.

### Detailed, step-by-step tasks for an AI implementer

Each task includes a short context reminder, implementation goal, and a definition of done. Follow order strictly.

1) Create a browser project scaffold (Vite + Vue 3 + TS)
- Context: We have a Node CLI game under `src`. We’ll add a Vue SPA for the browser without breaking CLI.
- Goal: Create `web/` with Vite + Vue 3 + TypeScript using Composition API. Keep domain code in `src/` and ensure the web build does not import Node-only modules (`IOConsole`, `index.ts`).
- DoD:
  - `web/` contains Vite Vue template with TypeScript.
  - Web build runs `yarn dev` inside `web/` with a blank page.
  - No imports from `src/index.ts` or `src/IOConsole.ts` in the web app.

2) Introduce an OutputPort to decouple printing from commands
- Context: Commands print via `console.log`, which the web UI cannot intercept.
- Goal: Add `OutputPort` interface and update commands to emit messages through it instead of printing.
  - Define `OutputPort` in `src/`:
    - `emit(message: string): void`
    - Optional: `emitBatch(messages: string[]): void` (nice-to-have)
  - Update `Command` interface to `execute(game: Game, out: OutputPort): void` and adjust all commands accordingly.
  - Replace `console.log(...)` with `out.emit(...)`.
- DoD:
  - All commands compile with new signature.
  - No direct `console.log` within commands (excluding tests).
  - `GameMain` uses an adapter that implements both `InputOutput` and `OutputPort` for CLI to preserve behavior.

3) Replace dynamic imports in `CommandFactory` with a static registry
- Context: Current factory uses dynamic import of `./${className}`, problematic for browser bundlers.
- Goal: Implement a static map `{ [commandName: string]: CommandCtor }` and construct commands from it.
  - Keep handling for invalid command.
  - Preserve parameter parsing logic.
- DoD:
  - `CommandFactory` no longer uses dynamic imports.
  - All commands are included in the registry.
  - CLI continues to work as before.

4) Add a GameController façade for UI consumption
- Context: `GameMain.play` loops on `readInput`; the browser will be event-driven instead.
- Goal: Create `GameController` exposing:
  - `process(instruction: string): GameUpdate` (synchronously process one instruction; returns messages and new state snapshot)
  - `getState(): GameState`
  - Types:
    - `GameState`: `{ room: RoomState, player: PlayerState, backpack: BackpackState, isGameOver: boolean, isWon: boolean }`
    - `RoomState`: `{ name: string, directions: string[], tools: { name: string; weight: number }[], character?: { name: string } }`
    - `PlayerState`: `{ name: string, points: number }`
    - `BackpackState`: `{ weight: number, maxWeight: number, tools: { name: string; weight: number }[] }`
    - `GameUpdate`: `{ messages: string[], state: GameState }`
  - Implement state mappers from existing classes to plain objects.
- DoD:
  - `GameController` can be constructed with a new `Game`.
  - Calling `process('look')` returns `GameUpdate` with messages and accurate state.
  - No Node APIs used.

5) Keep CLI working with minimal changes
- Context: We must not break terminal mode.
- Goal: Update `GameMain` and `index.ts` to work with the new `OutputPort`.
  - Add an adapter to bridge `OutputPort.emit` to `console.log` via `IOConsole.showMessage`.
  - Keep `GameMain.play` semantics unchanged for CLI.
- DoD:
  - `yarn ts-node src/index.ts` (or existing run command) still runs the game in terminal as before.
  - Messages still print to terminal correctly.

6) Expose typed actions in GameController for UI buttons
- Context: UI needs to trigger common actions without free-form text.
- Goal: Add helpers:
  - `move(direction: string)`, `pick(item: string)`, `drop(item: string)`, `talk()`, `interact()`, `look()`, `help()`, `quit()`
  - Each calls `process('<command> param?')` internally and returns `GameUpdate`.
- DoD:
  - All helpers implemented and unit-tested to call `process(...)`.
  - Returns match `GameUpdate` type.

7) Build a Pinia or composable store to manage GameState in the web app
- Context: Vue Composition API app needs reactive state.
- Goal: Create `useGameStore` (Pinia) or `useGame` composable to:
  - Hold `state: GameState` and `messages: string[]`.
  - Provide `submit(instruction)` and typed action methods that call `GameController`.
  - Initialize state from `controller.getState()` on app mount.
- DoD:
  - Store initialized and reactive.
  - Store methods update `state` and append to `messages`.

8) UI scaffolding and AppShell
- Context: We need a clean layout to host game components.
- Goal: Create `App.vue` with responsive layout:
  - Header with title and points.
  - Main area with two columns: left (map/room/character), right (inventory/log).
  - Footer with command input and action buttons.
- DoD:
  - Base layout renders with placeholder components.
  - Uses CSS variables and a light/dark theme toggle.

9) Room view component
- Context: Display the current room info.
- Goal: `RoomView.vue` shows:
  - Room name, character name or “-”, available directions list.
  - Tools in room with name and weight.
  - Buttons to move in each available direction, and to pick an item from the list.
- DoD:
  - Buttons wired to store actions; state updates after click.
  - Disabled states for invalid actions.
  - Unit tests for rendering based on `GameState.room`.

10) Map/minimap component
- Context: Provide basic spatial context without full pathfinding.
- Goal: `MapView.vue` shows a simple schematic (e.g., 2x2 or 3x3 placeholder) highlighting the current room name and possible exits. For now, static positions are acceptable since the map is fixed in `DungeonMap`.
- DoD:
  - Current room highlighted.
  - Adjacent exits indicated.
  - Accessible and responsive.

11) Player HUD component
- Context: Show player status.
- Goal: `PlayerHud.vue` displays name, points, and live win/lose status if applicable.
- DoD:
  - Renders correct points and status reactivity.
  - Visually signals low points (< 5) with warning color.

12) Backpack/inventory component
- Context: Manage and display inventory.
- Goal: `BackpackView.vue` shows items with weights and overall capacity usage; allows dropping items via buttons.
- DoD:
  - Drop action wired to store.
  - Shows weight as “Xkg/Ykg”.
  - Empty state handled.

13) Command input and action bar
- Context: Preserve command-line input for educational parity with CLI.
- Goal: `CommandBar.vue` provides:
  - Text input for command string (with basic validation).
  - A set of quick action buttons (look, help, talk, interact, quit).
  - Keyboard shortcuts (Enter to submit, ArrowUp to recall last command optional).
- DoD:
  - Submitting updates messages and state via store.
  - Errors show inline helper text.

14) Message log component
- Context: Show emitted messages from commands and system.
- Goal: `MessageLog.vue` appends messages from `GameUpdate.messages`.
  - Keep scroll-to-bottom on new messages.
  - Distinguish system vs action messages by style.
- DoD:
  - Messages append in order with timestamps.
  - Leftover console logs removed from web path.

15) Character interaction UI
- Context: Provide discoverability for talk/interact.
- Goal: In `RoomView.vue`, when a character is present:
  - Show character name and buttons for “Talk” and “Interact”.
  - Clicking invokes store actions and updates log.
- DoD:
  - Interactions update room and player state when applicable (e.g., `Wizard` gifting, `Witch` teleporting).
  - Proper messages shown.

16) Persist and restore session (optional but recommended)
- Context: Allow reloading without losing progress.
- Goal: Persist `GameState` and `messages` in `localStorage`.
  - Provide “New Game” button to reset.
- DoD:
  - Refresh retains state.
  - Reset clears storage and reinitializes.

17) Accessibility, theming, and UI polish
- Context: Basic usability and inclusive design.
- Goal:
  - Ensure keyboard navigation for all interactive elements.
  - High contrast mode; respects prefers-color-scheme.
  - Focus styles and ARIA labels for buttons.
- DoD:
  - Axe or similar audit passes with no critical issues.
  - Theming toggles work.

18) Unit tests for the GameController and store
- Context: Ensure correctness after refactor.
- Goal: Add Vitest unit tests:
  - `process('move east')` decrements points and changes room appropriately.
  - `pick/drop` update backpack and room tools.
  - `talk/interact` produce expected messages and state changes.
- DoD:
  - Tests pass; coverage added for core paths.

19) Component tests and minimal E2E
- Context: Validate UI integration.
- Goal:
  - Component tests for `RoomView`, `BackpackView`, `CommandBar`, `MessageLog`.
  - Playwright or Cypress basic flows: move, pick, talk, win/lose path.
- DoD:
  - CI runnable tests with headless browser.
  - Green baseline.

20) Documentation updates
- Context: Onboarding for new contributors.
- Goal:
  - Update `README.md` with:
    - Architecture diagram (domain vs UI).
    - How to run CLI vs Web.
    - How to add a new command and wire UI.
- DoD:
  - Clear setup steps.
  - Examples of typed actions and command input.

21) Design system, theming, and motion
- Context: The game should feel pleasant and responsive.
- Goal:
  - Install and configure `@vueuse/motion` and define presets in `web/src/motion/presets.ts`.
  - Optionally add Tailwind; define CSS variable tokens for colors, spacing, radii.
  - Apply motion to key components.
- DoD:
  - Motion presets used in `RoomView`, `BackpackView`, `MessageLog`, `CommandBar`.
  - Theme toggle respects prefers-reduced-motion.

22) Isometric map renderer and character movement
- Context: Provide an isometric look with a character moving between rooms.
- Goal:
  - Implement `IsometricMap.vue` (CSS transform default; optional `pixi.js` path) with a fixed layout mapping of rooms.
  - Add `PlayerSprite` with idle and walking animations; click-to-move on adjacent rooms; keyboard arrows/WASD.
- DoD:
  - Moving triggers domain `move` and animates sprite between node positions.
  - Ignore non-adjacent clicks or show inline error.

23) Asset manifest and loader
- Context: Art will be added later; code should be asset-ready now.
- Goal:
  - Create `web/src/assets/manifest.ts` with typed sprites and preload routine.
  - Types: `SpriteId`, `SpriteMeta { id, path, width, height, anchor, description }`.
- DoD:
  - Loader preloads images and exposes a sprite lookup; components use `SpriteId`.

24) Integrate sprites and polish interactions (optional)
- Context: Wire real art once assets exist.
- Goal:
  - Replace placeholders with manifest sprites in map, player, tools, characters.
  - Add subtle FX on pick/drop/talk/interact.
- DoD:
  - Smooth visuals; no layout jank.

### Assets catalog (for later manual addition)

Use `web/src/assets/sprites/` and these names/sizes (PNG). Anchors relative (0..1).

- Tiles
  - `iso_tile_floor.png` — 128×64; anchor { x: 0.5, y: 1.0 }
  - `iso_tile_wall.png` — 128×96; anchor { x: 0.5, y: 1.0 }
  - `iso_door_n|e|s|w.png` — 128×64; anchor { x: 0.5, y: 1.0 }

- Player
  - `player_idle.png` — 64×96; anchor { x: 0.5, y: 1.0 }
  - `player_walk_n_strip.png` — 8× 64×96; anchor { x: 0.5, y: 1.0 }
  - `player_walk_e_strip.png` — same sizing
  - `player_walk_s_strip.png` — same sizing
  - `player_walk_w_strip.png` — same sizing

- Characters
  - `dog.png` — 64×64; anchor { x: 0.5, y: 1.0 }
  - `witch.png` — 64×96; anchor { x: 0.5, y: 1.0 }
  - `wizard.png` — 64×96; anchor { x: 0.5, y: 1.0 }

- Tools
  - `tool_lantern.png` — 32×32; anchor { x: 0.5, y: 0.9 }
  - `tool_bone.png` — 32×32; anchor { x: 0.5, y: 0.9 }
  - `tool_key.png` — 32×32; anchor { x: 0.5, y: 0.9 }

- Effects (optional)
  - `fx_sparkle_strip.png` — 12× 64×64 — wizard gift
  - `fx_curse.png` — 64×64 — witch pulse
  - `fx_bite.png` — 64×64 — dog bite

- UI Icons
  - `ui_arrow_n|e|s|w.svg`, `ui_pick.svg`, `ui_drop.svg`, `ui_talk.svg`, `ui_interact.svg`, `ui_help.svg`

### Notes on refactor touchpoints

- `InputOutput` exists but commands do not consume it. We will add `OutputPort` and pass it to `execute(...)` to avoid further coupling to CLI.
- `GameMain` will keep using `InputOutput` plus a bridge to `OutputPort` for terminal mode.
- `CommandFactory` will switch to a static registry to avoid dynamic `import()` in the browser.
- `Room.getDescription`/`Player.getDescription`/`Backpack.getDescription` are CLI-oriented; in the web UI we’ll ignore these and use structured state via `GameController`.
```119:128:/src/environments/Room.ts
  public getDescription(): string {
    let description = '#####\n';
    description += `🛏️ Room: ${this.name}\n`;
    description += `Available directions: ${this.getAvailableDirections().join(' - ')}\n`;
    const availableTools = this.getAvailableTools();
    description += `Tools in the room: ${availableTools.length ? availableTools.map(el =>
        el.getDescription()) : '-'}\n`;
    description += `Character in the room: ${this.character ? this.character.getName() : '-'}\n`;
    description += '#####';
    return description;
  }
```

### Definition of the shared state contract (for UI and potential future adapters)

- GameState
  - `room: { name: string; directions: string[]; tools: { name: string; weight: number }[]; character?: { name: string } }`
  - `player: { name: string; points: number }`
  - `backpack: { weight: number; maxWeight: number; tools: { name: string; weight: number }[] }`
  - `isGameOver: boolean`
  - `isWon: boolean`
- GameUpdate
  - `messages: string[]`
  - `state: GameState`
