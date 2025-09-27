# AGENTS.md

A predictable, agent-focused guide for implementing a browser UI on top of the existing TypeScript OOP dungeon game. Follows the open AGENTS.md format. See the standard at [AGENTS.md](https://agents.md/).

## Project overview

- The current project is a terminal-only RPG-like dungeon exploration game written in TypeScript.
- Domain logic lives in `src/` and is covered by Vitest tests. The CLI uses Node `readline` via `IOConsole`.
- Goal: deliver a Vue 3 (Composition API) browser UI that reuses the existing domain logic with minimal refactors.

### Key files (domain and CLI)
- `src/index.ts`: CLI entry; constructs `IOConsole` and `GameMain`.
- `src/GameMain.ts`: main loop; reads user input, builds command, executes, prints messages.
- `src/Game.ts`: holds `DungeonMap`, `currentRoom`, `Player`; win/lose and game-over checks.
- `src/environments/*`: `Room`, special rooms (`DarkRoom`, `MagicRoom`, `BlockedRoom`), `DungeonMap` init.
- `src/player/*`: `Player`, `Backpack`.
- `src/tools/Tool.ts`: simple item type with name and weight.
- `src/commands/*`: command implementations; currently emit output via `console.log`.
- `src/characters/*`: `Dog`, `Witch`, `Wizard` interactions mutate game state and produce messages.
- `src/InputOutput.ts`, `src/IOConsole.ts`, `src/IOSimulator.ts`: IO abstraction and console implementations.

## Setup commands

- Install deps: `yarn install`
- Type-check: `yarn lint`
- Run tests: `yarn test`
- Build: `yarn build`
- Run CLI in dev (terminal): `yarn dev`

## Code style and conventions

- TypeScript, strict and typed APIs where possible.
- ES modules only; destructure imports when possible.
- Prefer functional patterns (map/filter/reduce) and early returns.
- Use descriptive names; event handlers prefixed with `handle`.
- Use `const` arrow functions for new functions.
- Vue 3 Composition API in the web app.
- Keep domain logic framework-agnostic; UI should consume via a façade layer.

## Testing instructions

- Unit tests with Vitest: `yarn test`
- Type checks and ESLint: `yarn lint`
- Add or update tests for any code you change in `src/`.

## Security and portability

- Do not introduce Node-specific APIs into browser-targeted paths.
- Keep CLI fully working after refactors.
- Avoid dynamic `import()` patterns that confuse bundlers for browser code.

## Directory plan

- Keep domain code in `src/`.
- Create a new `web/` for the Vue app (Vite + TS). UI must depend on a façade, not directly on Node-only modules.

## Recommended UI libraries (design, animation, rendering)

- Styling/theming: keep CSS variables; optionally add Tailwind CSS for rapid UI (plugin-friendly, accessible defaults).
- Animations/motion: `@vueuse/motion` (Motion One) for component transitions; `gsap` for advanced timelines when needed.
- Isometric rendering: start with CSS transforms (rotate/skew) or use `pixi.js` + `pixi-viewport` for a canvas-based isometric grid with smooth panning/zoom and sprite control.
- Icons: `@iconify/vue` for consistent vector icons.

---

## Implementation tasks (with context, steps, and definition of done)

Follow tasks in order. Each task includes a brief context reminder, steps, and a Definition of Done (DoD). Keep commits small and focused. Maintain CLI compatibility.

### 1) Scaffold browser project (Vue 3 + Vite + TS)
- Context: Add a web app without breaking existing CLI.
- Steps:
  - Create `web/` via Vite Vue + TypeScript template.
  - Configure `web/vite.config.ts` and `web/tsconfig.json` (strict mode recommended).
  - Ensure `web/` does not import `src/index.ts` or `src/IOConsole.ts`.
- DoD:
  - `yarn dev` (from `web/`) runs a blank Vue app.
  - Lint and tests still pass at repo root.

### 2) Introduce OutputPort to decouple command output
- Context: Commands currently `console.log`, which a browser UI cannot intercept.
- Steps:
  - Add `src/OutputPort.ts` with `interface OutputPort { emit(message: string): void }` (optionally `emitBatch(messages: string[]): void`).
  - Update `src/commands/Command.ts` to `execute(game: Game, out: OutputPort): void`.
  - Refactor all `src/commands/*` to replace `console.log(...)` with `out.emit(...)`.
  - Add a small adapter for CLI that implements `OutputPort` and forwards to `IOConsole.showMessage`.
- DoD:
  - All commands compile with the new signature.
  - No `console.log` calls remain in commands.
  - CLI still prints messages as before via the adapter.

### 3) Replace dynamic imports in CommandFactory with a static registry
- Context: Dynamic imports hinder browser bundling.
- Steps:
  - Create a registry in `src/commands/CommandRegistry.ts` that maps command names to constructors.
  - Refactor `CommandFactory` to use the registry and preserve parameter parsing and invalid fallback.
- DoD:
  - `CommandFactory` no longer uses `import()`.
  - All commands present in the registry.
  - CLI behavior unchanged (all tests green).

### 4) Add GameController facade for UI
- Context: Browser UI is event-driven and needs structured state and messages.
- Steps:
  - Add `src/ui/GameController.ts` exposing:
    - `process(instruction: string): GameUpdate`
    - `getState(): GameState`
  - Define types in `src/ui/types.ts`:
    - `GameState`, `RoomState`, `PlayerState`, `BackpackState`, `GameUpdate`.
  - Implement mappers from domain objects to plain state.
- DoD:
  - `process('look')` returns messages and a correct state snapshot.
  - No Node APIs used in `src/ui/*`.

### 5) Keep CLI working with minimal changes
- Context: Terminal mode must remain functional.
- Steps:
  - Create an `OutputPort` adapter for CLI.
  - Update `GameMain` to pass `OutputPort` to `execute(...)`.
- DoD:
  - `yarn dev` (CLI) works and prints messages.

### 6) Add typed actions in GameController
- Context: UI needs first-class actions without free-form text.
- Steps:
  - Implement helpers in `GameController`: `move(direction)`, `pick(item)`, `drop(item)`, `talk()`, `interact()`, `look()`, `help()`, `quit()` that call `process(...)` under the hood.
- DoD:
  - Helpers return `GameUpdate` and are unit-tested to call `process`.

### 7) Create a store/composable for UI
- Context: Vue UI needs reactive state.
- Steps:
  - Use Pinia or a composable `useGame()` in `web/src/` to hold `state: GameState` and `messages: string[]`.
  - Wire methods to `GameController` and initialize state on mount.
- DoD:
  - Reactive updates work; messages append in order.

### 8) App shell and layout
- Context: Provide a clean container for views.
- Steps:
  - Build `App.vue` with header (title, points), main (left: map/room/character; right: inventory/log), footer (command input and actions).
  - Add theme variables and light/dark toggle.
- DoD:
  - Layout renders with placeholder child components.

### 9) Room view component
- Context: Show current room details and actions.
- Steps:
  - `RoomView.vue` shows room name, character (or “-”), directions, and tools in room.
  - Provide buttons to move and to pick visible tools.
- DoD:
  - Buttons call store actions; disabled states for invalid actions; unit tests pass.

### 10) Map/minimap component
- Context: Provide basic spatial context.
- Steps:
  - `MapView.vue` shows a simple static schematic for the fixed map, highlights current room and exits.
- DoD:
  - Current room highlighted; responsive and accessible.

### 11) Player HUD component
- Context: Show player status.
- Steps:
  - `PlayerHud.vue` shows name, points, win/lose indicators.
  - Warn when points < 5.
- DoD:
  - Reactive display; visual warning on low points.

### 12) Backpack/inventory component
- Context: Manage inventory.
- Steps:
  - `BackpackView.vue` shows items with weights, capacity usage; drop buttons.
- DoD:
  - Drop action works; empty state handled correctly.

### 13) Command input and action bar
- Context: Preserve command-line input in the browser.
- Steps:
  - `CommandBar.vue` with text input, quick action buttons, and keyboard shortcuts (Enter to submit; optional history).
- DoD:
  - Submitting updates store state and messages; inline errors for invalid inputs.

### 14) Message log component
- Context: Show messages from commands and system.
- Steps:
  - `MessageLog.vue` appends `GameUpdate.messages`, auto-scrolls to bottom, styles system vs action messages.
- DoD:
  - Messages are timestamped and readable; no stray console logs in web code paths.

### 15) Character interactions in UI
- Context: Discoverability for talk/interact.
- Steps:
  - In `RoomView.vue`, show character name and buttons for Talk and Interact when present.
- DoD:
  - Interactions correctly update state (e.g., wizard gift, witch teleport) and messages.

### 16) Persist/restore session (optional recommended)
- Context: Improve UX by persisting progress.
- Steps:
  - Persist `GameState` and `messages` in `localStorage`; add a New Game reset.
- DoD:
  - Refresh restores state; reset clears storage and reinitializes.

### 17) Accessibility, theming, and polish
- Context: Inclusive design and usability.
- Steps:
  - Ensure keyboard navigation, ARIA where appropriate, high-contrast support; respect `prefers-color-scheme`.
- DoD:
  - Automated accessibility audit shows no critical issues; theme toggle works.

### 18) Unit tests for GameController and store
- Context: Protect refactors and ensure correctness.
- Steps:
  - Vitest tests for `process('move east')`, `pick/drop`, `talk/interact` paths.
- DoD:
  - Tests green; coverage added for core flows.

### 19) Component tests and minimal E2E
- Context: Validate UI integration.
- Steps:
  - Component tests for `RoomView`, `BackpackView`, `CommandBar`, `MessageLog`.
  - Add minimal end-to-end flow (Cypress or Playwright): move, pick, talk, win/lose.
- DoD:
  - CI-friendly headless runs pass.

### 20) Documentation updates
- Context: Onboarding for future contributors.
- Steps:
  - Update `README.md` with architecture diagram (domain vs UI), CLI vs Web run instructions, adding new commands.
- DoD:
  - Clear setup and contribution steps; examples included.

### 21) Design system, theming, and motion
- Context: The game should feel pleasant and responsive.
- Steps:
  - Install and configure `@vueuse/motion` for page and component transitions; define motion presets (fade, slide-up, scale-in) under `web/src/motion/presets.ts`.
  - Optionally install Tailwind CSS and set up a tokenized theme using CSS variables in `:root` with dark/light variants.
  - Define interaction guidelines: hover/press/disabled states; focus rings; reduced-motion support.
- DoD:
  - Motion presets applied to key components (`RoomView`, `BackpackView`, `MessageLog`, `CommandBar`).
  - Dark/light theme toggle animated; respects `prefers-reduced-motion`.

### 22) Isometric map renderer and character movement
- Context: Provide an isometric look with a character moving between rooms.
- Steps:
  - Create `IsometricMap.vue` that renders rooms as isometric tiles (CSS transform approach by default: rotate 45deg + skewY; optional `pixi.js` flag).
  - Represent each domain `Room` as a node in a fixed layout; draw connectors for available directions. Highlight current room.
  - Add a `PlayerSprite` with idle and walking states; animate transitions when moving between rooms.
  - Hook up click-to-move on adjacent rooms; keyboard (arrow/WASD) mapped to directions.
- DoD:
  - Moving via UI triggers domain `move` and animates the sprite between room positions.
  - Non-adjacent clicks are ignored or show an inline error.

### 23) Asset manifest and loader
- Context: We’ll add art later; code should be ready now.
- Steps:
  - Create `web/src/assets/manifest.ts` exporting a typed manifest of sprites (see Assets Catalog) and a preloader that resolves when all images are ready.
  - Define types: `SpriteId`, `SpriteMeta { id, path, width, height, anchor, description }`.
  - Integrate loader in app bootstrap; show a minimal loading screen while assets preload.
- DoD:
  - Manifest compiles; loader preloads and exposes a lookup for sprites.
  - Components use `SpriteId` instead of hardcoded paths.

### 24) Integrate sprites and polish interactions (optional)
- Context: Wire real art to components when assets are available.
- Steps:
  - Replace placeholders with manifest sprites in `IsometricMap`, `PlayerSprite`, and tool/character renderers.
  - Add subtle animations for pick/drop and character talk/interact (e.g., sparkle, shake).
- DoD:
  - Visual feedback plays on actions; no layout shifts or jank.

## Assets catalog (for later manual addition)

Use `web/src/assets/sprites/` with the following naming conventions and recommended sizes (PNG preferred, power-of-two where possible). Anchors are relative (0..1).

- Tiles
  - `iso_tile_floor.png` — 128×64 isometric diamond floor tile; anchor: { x: 0.5, y: 1.0 }
  - `iso_tile_wall.png` — 128×96 wall/edge overlay; anchor: { x: 0.5, y: 1.0 }
  - `iso_door_n.png|e.png|s.png|w.png` — 128×64 door overlays per side; anchor: { x: 0.5, y: 1.0 }

- Player
  - `player_idle.png` — 64×96 idle frame; anchor: { x: 0.5, y: 1.0 }
  - `player_walk_n_strip.png` — 8 frames, 64×96 each; anchor: { x: 0.5, y: 1.0 }
  - `player_walk_e_strip.png` — same sizing and anchor
  - `player_walk_s_strip.png` — same sizing and anchor
  - `player_walk_w_strip.png` — same sizing and anchor

- Characters
  - `dog.png` — 64×64; anchor: { x: 0.5, y: 1.0 } — hall character
  - `witch.png` — 64×96; anchor: { x: 0.5, y: 1.0 } — teleporter
  - `wizard.png` — 64×96; anchor: { x: 0.5, y: 1.0 } — gift giver

- Tools
  - `tool_lantern.png` — 32×32; anchor: { x: 0.5, y: 0.9 } — lights dark rooms
  - `tool_bone.png` — 32×32; anchor: { x: 0.5, y: 0.9 } — dog favorite
  - `tool_key.png` — 32×32; anchor: { x: 0.5, y: 0.9 } — unlocks

- Effects (optional)
  - `fx_sparkle_strip.png` — 12 frames, 64×64 — wizard gift effect
  - `fx_curse.png` — 64×64 — witch interaction pulse
  - `fx_bite.png` — 64×64 — dog bite flash

- UI Icons
  - `ui_arrow_n|e|s|w.svg` — direction arrows
  - `ui_pick.svg`, `ui_drop.svg`, `ui_talk.svg`, `ui_interact.svg`, `ui_help.svg`

Example manifest types:

```ts
export type SpriteId =
  | 'iso_tile_floor' | 'iso_tile_wall' | 'iso_door_n' | 'iso_door_e' | 'iso_door_s' | 'iso_door_w'
  | 'player_idle' | 'player_walk_n' | 'player_walk_e' | 'player_walk_s' | 'player_walk_w'
  | 'dog' | 'witch' | 'wizard'
  | 'tool_lantern' | 'tool_bone' | 'tool_key'
  | 'fx_sparkle' | 'fx_curse' | 'fx_bite';

export interface SpriteMeta {
  id: SpriteId;
  path: string;
  width: number;
  height: number;
  anchor: { x: number; y: number };
  description: string;
}
```

---

## PR and commit guidelines

- Title format: `[web-ui] <short change summary>` or `[domain] <short change summary>`.
- Always run `yarn lint` and `yarn test` before pushing.
- For refactors, include a brief rationale and before/after behavior notes in the PR description.

## Agent execution notes

- If instructions conflict, this AGENTS.md takes precedence near UI tasks; explicit user prompts override everything.
- Prefer adding tests first when changing domain signatures (e.g., `Command.execute(...)`).
- Keep changes reversible and isolated; submit iterative PRs per task.
