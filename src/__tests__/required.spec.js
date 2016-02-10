import assert from 'assert';
import { required } from '../basic-validations';

describe('Validator: required', function () {
  it('should be valid when `value` is empty and `prop` is false', function () {
    assert(required({}, '', false) === false);
  });
  it('should be valid when `value` is truthy and `prop` is false', function () {
    assert(required({}, 'true', false) === false);
  });
  it('should be invalid when `value` is empty and `prop` is true', function () {
    assert(required({}, '', true) === true);
  });
  it('should be valid when `value` is truthy and `prop` is true', function () {
    assert(required({}, 'true', true) === false);
  });
});
