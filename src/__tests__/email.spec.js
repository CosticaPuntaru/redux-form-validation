import assert from 'assert';
import { email } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: email', function () {
  it('should be invalid when `prop` is "x"', function () {
    assert(email({}, 'x', true) === true);
  });
  it('should be invalid when `prop` is "x@"', function () {
    assert(email({}, 'x@', true) === true);
  });
  it('should be invalid when `prop` is "@x"', function () {
    assert(email({}, '@x', true) === true);
  });
  it('should be invalid when `prop` is "x@x"', function () {
    // Note: we are assuming that the domain name will contain at least one '.'.
    // So `localhost`, for example, will not be considered a valid domain name.
    assert(email({}, 'x@x', true) === true);
  });
  it('should be invalid when `prop` is "x@x."', function () {
    assert(email({}, 'x@x.', true) === true);
  });
  it('should be valid when `prop` is "x@x.x"', function () {
    assert(email({}, 'x@x.x', true) === false);
  });
  it('should be valid when `prop` is "x@x.xx"', function () {
    assert(email({}, 'x@x.xx', true) === false);
  });
  it('should be valid when `prop` is "x@xx.xx"', function () {
    assert(email({}, 'x@xx.xx', true) === false);
  });
  it('should be valid when `prop` is "x@192.16.0.10"', function () {
    assert(email({}, 'x@192.16.0.10', true) === false);
  });
});
