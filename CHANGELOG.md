# 0.0.6
- **added** `allValues` and `allProps` params to validator.
    It can be used to create validations that requires other fields value and props  like `matchField`.
example:
```javascript
import FormMessages from 'redux-form-validation';

FormMessages.addValidation('matchField', function(field, value, prop, dispatch, allValues, allProps){
    return !value ? false : value != allValues[prop];
})
```

- **added** `matchField` validation.
    must give the matching field name as value.

example:
```javascript 
var validations = {
    email: {
        required: true,
        email: true,
        validateOnBlur: true,
    },
    retryEmail: {
        validateOnBlur: true,
        matchField: 'email',
  },
}
```
- **added** example.
    To run the example run `npm i -d && npm start`
- **fixed** `FormMessage` component.
    Render error when only has one child.
- **added** tests
    credits for this one goes to @mcalthrop
