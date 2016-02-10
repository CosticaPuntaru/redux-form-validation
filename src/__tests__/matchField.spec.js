import assert from 'assert';
import { matchField } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: matchField', function () {
  it('should be valid when `value` (string) equals value of the given fieldName', function () {
    assert(matchField({}, 'matcher', 'otherField', false, {otherField: 'matcher'} ) === false);
  });

  it('should not be valid when `value` (string) not equals value of the given fieldName', function () {
    assert(matchField({}, 'matcher', 'otherField', false, {otherField: 'non-matcher'} ) === true);
  });
});
