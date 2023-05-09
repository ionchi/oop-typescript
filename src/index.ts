import { GameMain } from './GameMain';
import { IOSimulator } from './IOSimulator';

function main() {
  const simulatorWinningInstructions = [
    'move south',
    'pick lantern',
    'move north',
    'move east',
    'drop lantern',
    'pick key',
    'move west',
    'drop key',
    'move north'
  ];

  const logger = new IOSimulator(simulatorWinningInstructions);
  const theGame = new GameMain(logger);

  theGame.play().then(() => {});
}

main();
