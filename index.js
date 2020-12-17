const COLOR_BLACK = 'black';
const COLOR_WHITE = 'white';
const COLOR_GREEN = 'green';
const COLOR_YELLOW = 'yellow';

const playerMachine = {
  main() {
    let slots = new Array(4);

    for (let i = 0; i <= 3; i++) {
      slots[i] = this.mapColors(this.getRandomNumber());
    }

    return this.hasPlayerWon(slots);
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

  hasPlayerWon(slot) {
    const winningColor = slot[0];
    return slot.every((color) => color === winningColor);
  },
};

module.exports = playerMachine;
