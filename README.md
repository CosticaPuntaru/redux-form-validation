# redux-form-validation THIS LIBRARY NOT MENTAINED

[![Build Status](https://travis-ci.org/CosticaPuntaru/redux-form-validation.svg?branch=master)](https://travis-ci.org/CosticaPuntaru/redux-form-validation)
[![npm version](https://img.shields.io/npm/v/redux-form-validation.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validation)
[![npm downloads](https://img.shields.io/npm/dm/redux-form-validation.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validation)
## Installation
```npm install --save redux-form-validation```

## How to use
adds a helper to display and validate fields for redux-form

builtin validation can be found in /src/basic-validation.js


### How to add your validation:
```javascript

  import FormMessages from 'redux-form-validation';
  
  FormMessages.addValidation('required', function (field, value, prop, dispatch, allValues, allProps) {
     return prop ? !value : false
   })
```
to make async validation you can return a promise in your validation function

NOTE: all the validations are indexed by the key, if you add a `require` validation it will overwrite the validation used before
The validation function can return a `message` or `true` if the field is invalid
If the field is valid the validation function must return `false`


### How to display error messages in form
#### Component Props:

* `tagName`: Specify element type to render as message list container (default is `div`)
* `errorCount` : Specify how many errors to be displayed at once (default `-1`= all)
* `Meta` : The `redux-form` Meta (or for other uses a object with {touch, error})


example for how to use validator:

```javascript
  import React, {Component} from 'react';
  import {reduxForm, Field} from 'redux-form';
  import {connect} from 'react-redux';
  import FormMessages from 'redux-form-validation';
  import {generateValidation} from 'redux-form-validation';
  
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  
  
  const validations = {
    email: {
      validateOnBlur: true,
      required: true,
      minLength: 5,
      email: true,
      promise: function (fieldName, fieldValue, dispatch) {
        return sleep(1000).then(() => {
          if (['example@example.com', 'test@example.com'].indexOf(fieldValue.trim()) > -1) {
            return Promise.reject('That email ' + fieldValue + ' is taken')
          }
        })
      }
    },
    retryEmail: {
      validateOnBlur: true,
      required: true,
      matchField: 'email',
    },
    name: {
      required: true
    },
    subject: {
      required: true,
      minLength: 5
    },
    message: {
      required: true,
      minLength: 10
    }
  };
  
  
  const submit = (values, dispatch) => {
    console.log('sending mail to contact', values);
  };
  
  @connect()
  @reduxForm({
    form: 'contact',
    ...generateValidation(validations)
  })
  export default class ContactForm extends Component {
    // probably you will want to use different messages for different fields but for the demo this is good enough
    renderField = ({input, label, type, meta}) => {
      return (
        <div>
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} />
            <FormMessages tagName="ul" meta={meta}>
              <li when="promise">
                {meta && meta.error && meta.error.promise}
              </li>
              <li when="matchField">
                the retry email must be the same as the email
              </li>
              <li when="required">
                this field is required
              </li>
              <li when="email">
                please insert a valid email
              </li>
              <li when="minLength">
                this field must have at least 5 characters
              </li>
            </FormMessages>
          </div>
        </div>
      );
    }
  
    render() {
      const {
        handleSubmit,
        submitting,
        valid,
        pristine,
        asyncValidating,
      } = this.props;
      console.log('this.props', this.props);
      var submitLabel = "Send";
  
      if (pristine) {
        submitLabel = "Fill in your message";
      } else if (asyncValidating) {
        submitLabel = "Validating...";
      } else if (submitting) {
        submitLabel = "Sending...";
      } else if (!valid) {
        submitLabel = "Please fill all fields correctly";
      }
      return (
        <form onSubmit={handleSubmit(submit)}>
          <Field
            name="email"
            type="email"
            component={this.renderField}
            label="Username (test@example.com is taken)"
          />
  
          <Field
            name="retryEmail"
            type="email"
            component={this.renderField}
            label="Retry email"
          />
          <Field
            name="name"
            type="text"
            component={this.renderField}
            label="Username"
          />
  
          <Field
            name="subject"
            type="text"
            component={this.renderField}
            label="Subject"
          />
          <Field
            name="message"
            type="text"
            component={this.renderField}
            label="Message"
          />
          <button onClick={handleSubmit(submit)}>
            {submitLabel}
          </button>
        </form>
      );
    }
  }


```

## Without ES2015

```javascript
var temp = generateValidation(validations);
reduxForm({
     form: 'contact',
     asyncValidate: temp.asyncValidate,
     asyncBlurFields: temp.asyncBlurFields,
     fields: temp.fields,
   })(YourComponent)
```


## Examples:
to run the example project you need to clone the repo and run `npm i -d && npm start`

