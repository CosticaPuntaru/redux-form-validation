import assert from 'assert';
import { pattern } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: pattern', function validateMaxLength() {
  it('should be valid when `value` matches `prop` regex', function () {
    assert(pattern({}, '__matcher__', /.*matcher.*/) === false);
  });
  it('should be invalid when `value` does not match `prop` regex', function () {
    assert(pattern({}, '__doesNotMatch__', /.*matcher.*/) === true);
  });
  it('should throw TypeError when `prop` is boolean', function () {
    assert.throws(
      () => pattern({}, 'z', true),
      TypeError
    );
  });
  it('should throw TypeError when `prop` is string', function () {
    assert.throws(
      () => pattern({}, 'z', 'a nice string'),
      TypeError
    );
  });
  it('should throw TypeError when `prop` is object', function () {
    assert.throws(
      () => pattern({}, 'z', {}),
      TypeError
    );
  });
  it('should throw TypeError when `prop` is number', function () {
    assert.throws(
      () => pattern({}, 'z', 99),
      TypeError
    );
  });
});
