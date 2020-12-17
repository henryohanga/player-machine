const playerMachine = require('./index.js');

describe('Player Machine', () => {
  describe('hasPlayerWon', () => {
    it('should return true if all the colors match', () => {
      const winningCombo = new Array(4).fill('green');
      const losingCombo = ['green', 'white', 'yellow', 'black'];

      expect(playerMachine.hasPlayerWon(winningCombo)).toBe(true);
      expect(playerMachine.hasPlayerWon(losingCombo)).toBe(false);
    });
  });

  describe('getRandomNumber', () => {
    it('should return a number between 0 and 3 inclusive', () => {
      expect([0, 1, 2, 3].includes(playerMachine.getRandomNumber())).toBe(true);
    });
  });

  describe('updateFloats', () => {
    describe('when  all color are different', () => {
      it('should credit user with half the sum in machine float', () => {
        const slots = ['green', 'white', 'black', 'yellow'];
        const machineFloat = 1000;
        const userFloat = 10;

        const round = playerMachine.updateFloats(
          slots,
          machineFloat,
          userFloat,
          0
        );

        expect(round.machineFloat).toEqual(500);
        expect(round.userFloat).toEqual(510);
      });
    });

    describe('when there are two similar colors in adjacent slot', () => {
      it('should pay out 5 times the cost of a single play', () => {
        const slots = ['green', 'yellow', 'yellow', 'white'];
        const machineFloat = 1000;
        const userFloat = 10;

        const expectedWin = 50; // our cost is hard defined as 10;

        const round = playerMachine.updateFloats(
          slots,
          machineFloat,
          userFloat
        );

        expect(round.machineFloat).toBe(machineFloat - expectedWin);
        expect(round.userFloat).toBe(userFloat + expectedWin);
      });

      describe('when the machine does not have enough money to settle player prize', () => {
        it('should award user free plays equiv to difference of prize and available machine float', () => {
          const slots = ['green', 'yellow', 'yellow', 'white'];
          const machineFloat = 10;
          const userFloat = 10;

          const expectedWin = 50; // our cost is hard defined as 10;
          const round = playerMachine.updateFloats(
            slots,
            machineFloat,
            userFloat,
            0
          );

          expect(round.machineFloat).toBe(0);
          expect(round.userFreePlays).toBe(40);
        });
      });
    });
  });
});
