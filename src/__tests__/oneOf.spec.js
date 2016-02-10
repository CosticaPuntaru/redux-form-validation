import assert from 'assert';
import { oneOf } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: oneOf', function () {
  it('should be valid when `value` (string) is listed in `prop`', function () {
    assert(oneOf({}, 'bb', ['aa', 'bb', 'cc']) === false);
  });
  it('should be invalid when `value` (string) is not listed in `prop`', function () {
    assert(oneOf({}, 'zz', ['aa', 'bb', 'cc']) === true);
  });
  it('should be valid when `value` (number) is listed in `prop`', function () {
    assert(oneOf({}, 13, [11, 12, 13]) === false);
  });
  it('should be invalid when `value` (number) is not in `prop`', function () {
    assert(oneOf({}, 99, [11, 12, 13]) === true);
  });
  it('should throw TypeError when `prop` is boolean', function () {
    assert.throws(
      () => oneOf({}, 'z', true),
      TypeError
    );
  });
  it('should throw TypeError when `prop` is object', function () {
    assert.throws(
      () => oneOf({}, 'z', {}),
      TypeError
    );
  });
  it('should throw TypeError when `prop` is number', function () {
    assert.throws(
      () => oneOf({}, 'z', 99),
      TypeError
    );
  });
});
