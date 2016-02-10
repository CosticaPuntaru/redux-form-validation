import assert from 'assert';
import { maxLength } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: maxLength', function () {
  it('should be valid when `value` is undefined and `prop` is 3', function () {
    assert(maxLength({}, undefined, 3) === false);
  });
  it('should be invalid when `value` is "1234" and `prop` is 3', function () {
    assert(maxLength({}, '1234', 3) === true);
  });
  it('should be valid when `value` is "1234" and `prop` is 4', function () {
    assert(maxLength({}, '1234', 4) === false);
  });
  it('should be valid when `value` is "1234" and `prop` is 5', function () {
    assert(maxLength({}, '1234', 5) === false);
  });
});
