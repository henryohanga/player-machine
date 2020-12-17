const COLOR_BLACK = 'black';
const COLOR_WHITE = 'white';
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';

const COST_OF_SINGLE_PLAY = 10;
const MULTIPLIER_FACTOR = 5;

let slots = new Array(4);

const playerMachine = {
  play(machineFloat, userFloat, userFreePlays = 0) {
    for (let i = 0; i <= 3; i++) {
      slots[i] = this.mapColors(this.getRandomNumber());
    }

    let prizeResults;

    if (this.hasPlayerWon(slots)) {
      userFloat += machineFloat;
      machineFloat = 0;

      prizeResults = { machineFloat, userFloat, userFreePlays };
    } else {
      prizeResults = this.updateFloats(
        slots,
        machineFloat,
        userFloat,
        userFreePlays
      );
    }

    return { ...prizeResults, slots };
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

  hasPlayerWon(slots) {
    const winningColor = slots[0];
    return slots.every((color) => color === winningColor);
  },

  updateFloats(slots, machineFloat, userFloat, userFreePlays) {
    let prize = 0;

    if ([...new Set(slots)].length === 4) {
      prize = machineFloat / 2;

      userFloat += prize;
      machineFloat -= prize;

      return { machineFloat, userFloat, userFreePlays };
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

    return { userFloat, machineFloat, userFreePlays };
  },
};

console.log('Player machine');
console.log(playerMachine.play(1000, 100));

module.exports = playerMachine;
