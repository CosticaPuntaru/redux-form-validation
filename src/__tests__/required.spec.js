import assert from 'assert';
import { required } from '../basic-validations';

describe('Validator: required', function validateRequired() {
  it('should return false when `value` is empty and `prop` is false', function () {
    assert(required({}, '', false) === false);
  });
  it('should return false when `value` is truthy and `prop` is false', function () {
    assert(required({}, 'true', false) === false);
  });
  it('should return true when `value` is empty and `prop` is true', function () {
    assert(required({}, '', true) === true);
  });
  it('should return false when `value` is truthy and `prop` is true', function () {
    assert(required({}, 'true', true) === false);
  });
});
