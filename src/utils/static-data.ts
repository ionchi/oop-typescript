export const TEXT_MESSAGE = {
  initSetupMessage: 'Provide a path to a file with the map to load it, or press enter to load the default map (e.g. ./src/assets/defaultDungeon.json): ',
  initQuestion: 'What do you want to do? Type one of the available commands',
  invalidCommand: '🤷‍ I don\'t understand that. Type \'help\' to see the available commands.',
  welcomeMessage: '👋 Welcome to the dungeon!',
  availableCommands: '🎮 Available commands',
  darkRoomMessage: '🙈 It\'s very dark here!',
  invalidTool: '⚠️ Invalid tool!',
  invalidDirection: '⚠️ Invalid direction!',
  thanksForPlaying: '🙏 Thanks for playing!',
  noCharacter: '⚠️ There\'s no character here!',
  dogBadInteraction: '⚠️ Ouch! You\'ve been bitten by the dog! You lose 1 point.',
  noTools: '⚠️ You don\'t have any tools!',
  died: '😵 You died!'
};

export const COMMAND_NAME = {
  move: 'move',
  pick: 'pick',
  drop: 'drop',
  look: 'look',
  help: 'help',
  quit: 'quit',
  interact: 'interact',
  talk: 'talk',
  invalid: 'invalid',
  gift: 'gift'
};

export   const simulatorWinningInstructions = [
  'pick bone',
  'gift bone',
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
