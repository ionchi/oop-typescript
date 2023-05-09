import { GameMain } from './GameMain';
import { IOConsole } from './IOConsole';

function main() {
  const logger = new IOConsole();
  const theGame = new GameMain(logger);

  theGame.play().then(() => {});
}

main();
