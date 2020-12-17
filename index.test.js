const playerMachine = require('./index.js');

describe('Player Machine', () => {
  describe('main', () => {
    it('should indicate whether the player has won or not', () => {
      expect(typeof playerMachine.main()).toBe('boolean');
    });
  });
});

// test('a player wins only when all the colors match', () => {
//   const winning = ['green', 'green', 'green', 'green'];
//   const lost = ['yellow', 'green', 'green', 'green'];

//   expect(hasPlayerWon(winning)).toBe(true);
//   expect(hasPlayerWon(lost)).toBe(true);
// });
