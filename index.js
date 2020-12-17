const COLOR_BLACK = 'black';
const COLOR_WHITE = 'white';
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';

const COST_OF_SINGLE_PLAY = 10;
const MULTIPLIER_FACTOR = 5;

var userFloat = 100;
var machineFloat = 1000;

var userFreePlays = 0;

let slots = new Array(4);

const playerMachine = {
  play() {
    for (let i = 0; i <= 3; i++) {
      slots[i] = this.mapColors(this.getRandomNumber());
    }

    // deduct user credits
    if (userFreePlays === 0) {
      userFloat -= COST_OF_SINGLE_PLAY;
      machineFloat += COST_OF_SINGLE_PLAY;
    }

    // check prizing
    this.updateFloat();
  },

  getRandomNumber() {
    const number = Math.round(Math.random() * 10);
    return number % 4;
  },

  mapColors(number) {
    switch (number) {
      case 0: {
        return COLOR_BLACK;
      }

      case 1: {
        return COLOR_GREEN;
      }

      case 2: {
        return COLOR_WHITE;
      }

      case 3: {
        return COLOR_YELLOW;
      }
      default:
        throw Error('Invalid number played');
    }
  },

  hasPlayerWon() {
    const winningColor = slots[0];
    return slots.every((color) => color === winningColor);
  },

  updateFloat() {
    let prize = 0;

    if ([...new Set(slots)].length === 4) {
      prize = machineFloat / 2;

      userFloat += prize;
      machineFloat -= prize;

      return;
    }

    const hasSimilarColorsAdjacent = slots.some((color, index) => {
      if (index > 1) {
        return color === slots[index - 1];
      }

      return false;
    });

    if (hasSimilarColorsAdjacent) {
      prize = COST_OF_SINGLE_PLAY * MULTIPLIER_FACTOR;

      if (machineFloat >= prize) {
        userFloat += prize;
        machineFloat -= prize;
      } else {
        userFreePlays += prize - machineFloat;
        machineFloat = 0;
      }
    }
  },
};

console.log('Player machine');
playerMachine.play();
console.log({
  playerWon: playerMachine.hasPlayerWon(),
  userFloat,
  machineFloat,
  combination: slots,
});

module.exports = playerMachine;
