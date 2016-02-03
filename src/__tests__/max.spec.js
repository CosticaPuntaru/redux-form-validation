import assert from 'assert';
import { max } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: max', function validateMinLength() {
  it('should be valid when `value` is undefined and `prop` is 3', function () {
    assert(max({}, undefined, 3) === false);
  });
  it('should be valid when `value` is "99" and `prop` is 100', function () {
    assert(max({}, '99', 100) === false);
  });
  it('should be valid when `value` is "100" and `prop` is 100', function () {
    assert(max({}, '100', 100) === false);
  });
  it('should be invalid when `value` is "101" and `prop` is 100', function () {
    assert(max({}, '101', 100) === true);
  });
  it('should be valid when `value` is 99 and `prop` is 100', function () {
    assert(max({}, 99, 100) === false);
  });
  it('should be valid when `value` is 100 and `prop` is 100', function () {
    assert(max({}, 100, 100) === false);
  });
  it('should be invalid when `value` is 101 and `prop` is 100', function () {
    assert(max({}, 101, 100) === true);
  });
});
