import { GameMain } from './GameMain';
// import { IOSimulator } from './IOSimulator';
import { IOConsole } from './IOConsole';

function main() {
  // const simulatorWinningInstructions = [
  //   'pick bone',
  //   'gift bone',
  //   'move south',
  //   'pick lantern',
  //   'move north',
  //   'move east',
  //   'drop lantern',
  //   'pick key',
  //   'move west',
  //   'drop key',
  //   'move north'
  // ];

  const logger = new IOConsole();
  const theGame = new GameMain(logger);

  theGame.play().then(() => {});
}

main();
