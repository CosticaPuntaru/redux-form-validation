import assert from 'assert';
import { minLength } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: minLength', function validateMinLength() {
  it('should be false when `value` is `undefined` and `prop` is 3', function () {
    assert(minLength({}, undefined, 3) === false);
  });
  it('should be false when `value` is `1234` and `prop` is 3', function () {
    assert(minLength({}, '1234', 3) === false);
  });
  it('should be false when `value` is `1234` and `prop` is 4', function () {
    assert(minLength({}, '1234', 4) === false);
  });
  it('should be false when `value` is `1234` and `prop` is 5', function () {
    assert(minLength({}, '1234', 5) === true);
  });
});
