import { GameMain } from './GameMain';
// import { IOSimulator } from './IOSimulator';
import { IOConsole } from './IOConsole';

async function main() {
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

  const mapPath = await logger.readInput(
    'Provide a path to a file with the map to load it, or press enter to load the default map: ',
  );


  const theGame = new GameMain(logger, mapPath);

  theGame.play().then(() => {});
}

main().then(() => {});
