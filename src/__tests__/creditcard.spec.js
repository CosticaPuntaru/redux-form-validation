import assert from 'assert';
import { creditcard } from '../basic-validations';
// Sample valid CC numbers, split up into 4 separate pieces
// Source: http://www.getcreditcardnumbers.com/
const cards = [
  { type: 'Amex', pieces: [3483, 2314, 1931, 128] },
  { type: 'Diners', pieces: [3017, 5465, 5838, 90] },
  { type: 'Discover', pieces: [6011, 6855, 1062, 3624] },
  { type: 'JCB', pieces: [3528, 7139, 4254, 4326] },
  { type: 'JCB 15', pieces: [2100, 1991, 2694, 367] },
  { type: 'MasterCard', pieces: [5519, 4093, 1282, 6387] },
  { type: 'Visa 13', pieces: [4225, 4269, 4946, 6] },
  { type: 'Visa 16', pieces: [4532, 6628, 9297, 4839] },
];

const generate = (pieces, separator = '') =>
  pieces.join(separator);

const generateValid = (pieces, separator) =>
  generate(pieces, separator);

const generateInvalid = (pieces, separator) => {
  // only one digit in the card number needs to be altered in order for it to be invalid
  const invalidCardNumber = [pieces[0], pieces[1], pieces[2], pieces[3] + 1];

  return generate(invalidCardNumber, separator)
};

// Note: each validator returns `true` when the `value` is invalid
describe.only('Validator: creditcard', function () {
  describe('Should be valid', () => {
    describe('With no separator', () => {
      it('When `prop` is valid card number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, generateValid(card.pieces)) === false);
        });
      });
    });
    describe('With space separator', () => {
      it('When `prop` is valid card number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, generateValid(card.pieces, ' ')) === false);
        });
      });
    });
    describe('With "-" separator', () => {
      it('When `prop` is valid card number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, generateValid(card.pieces, '-')) === false);
        });
      });
    });
  });
  describe('Should be invalid', () => {
    describe('With no separator', () => {
      it('When `prop` is valid card number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, generateInvalid(card.pieces)) === true);
        });
      });
    });
    describe('With space separator', () => {
      it('When `prop` is valid card number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, generateInvalid(card.pieces, ' ')) === true);
        });
      });
    });
    describe('With "-" separator', () => {
      it('When `prop` is valid card number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, generateInvalid(card.pieces, '-')) === true);
        });
      });
    });
    describe('With non-number values', () => {
      it('When `prop` contains letters', () => {
        assert(creditcard(true, 'blah99') === true);
      });
    });
    describe('With number too long', () => {
      it('When `prop` contains number with length 1 longer than valid number', () => {
        cards.forEach((card) => {
          console.log('Card type:', card.type);
          assert(creditcard(true, `${generateValid(card.pieces)}9`) === true);
        });
      });
    });
  });
});
