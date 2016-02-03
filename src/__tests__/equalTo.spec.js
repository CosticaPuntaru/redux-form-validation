import assert from 'assert';
import { equalTo } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: equalTo', function () {
  it('should be valid when `value` (string) equals `prop` (string)', function () {
    assert(equalTo({}, 'matcher', 'matcher') === false);
  });
  it('should be invalid when `value` (string) does not equal `prop` (string)', function () {
    assert(equalTo({}, 'non-matcher', 'matcher') === true);
  });
  it('should be valid when `value` (number) equals `prop` (number)', function () {
    assert(equalTo({}, 77, 77) === false);
  });
  it('should be valid when `value` (number) does not equal `prop` (number)', function () {
    assert(equalTo({}, 77, 88) === true);
  });
});
