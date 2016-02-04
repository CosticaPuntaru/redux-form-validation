import assert from 'assert';
import { promise } from '../basic-validations';

// Note: each validator returns `true` when the `value` is invalid
describe('Validator: promise', function () {
  describe('Should throw Error', () => {
    it('When `prop` is boolean', () => {
      assert.throws(() => promise({}, '', true), Error);
    });
    it('When `prop` is string', () => {
      assert.throws(() => promise({}, '', ''), Error);
    });
    it('When `prop` is object', () => {
      assert.throws(() => promise({}, '', {}), Error);
    });
    it('When `prop` is number', () => {
      assert.throws(() => promise({}, '', 46), Error);
    });
  });
  describe('Should return expected result', () => {
    it('When function is provided', (done) => {
      const testField = 1;
      const testValue = 2;
      const testProp = (field, value) => {
        assert(field === testField);
        assert(value === testValue);
        done();
      };

      promise(testField, testValue, testProp);
    });
  });
});
