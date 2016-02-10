import assert from 'assert';
import { digits } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: digits', function () {
  describe('Should be valid', () => {
    it('When `prop` is "999"', () => {
      assert(digits(true, '999') === false);
    });
    it('When `prop` is 999', () => {
      assert(digits(true, 999) === false);
    });
  });
  describe('Should be invalid', () => {
    it('When `prop` is "blah"', () => {
      assert(digits({}, 'blah') === true);
    });
    it('When `prop` is "blah77"', () => {
      assert(digits({}, 'blah77') === true);
    });
    it('When `prop` is "4,000"', () => {
      assert(digits({}, '4,000') === true);
    });
    it('When `prop` is "77.7"', () => {
      assert(digits({}, '77.7') === true);
    });
    it('When `prop` is 77.7', () => {
      assert(digits({}, 77.7) === true);
    });
  });
});
