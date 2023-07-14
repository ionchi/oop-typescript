import { GameMain } from './GameMain';
import { IOConsole } from './IOConsole';
import { TEXT_MESSAGE } from './utils/static-data';

async function main() {
  const logger = new IOConsole();

  const mapPath = await logger.readInput(
    TEXT_MESSAGE.initSetupMessage,
  );

  const theGame = new GameMain(logger, mapPath);

  theGame.play().then(() => {});
}

main().then(() => {});
