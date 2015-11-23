
adds a helper to display and validate fields for redux-form

builtin validation can be found in /src/basic-validation.js


how to create your validation:
```javascript

  import FormMessages from 'redux-form-validation';
  
  FormMessages.addValidation('required', function (field, value, prop) {
     return prop ? !value : false
   })
```
to make async validation you can return a promise in your validation function




example for how to use validator:

```javascript
  import React, {Component, PropTypes} from 'react';
  import {reduxForm} from 'redux-form';
  import {connect} from 'react-redux';
  import {sendMail} from 'redux/modules/email-to-support.js';
  import FormMessages from 'redux-form-validation';
  
  var validations = {
    email: {
      validateOnBlur: true,
      required: true,
      minLength: 5,
      email: true
    },
    subject: {
      validateOnBlur: true,
      required: true,
      minLength: 5
    }
  };
  
  
  const submit = (values, dispatch) => {
    return dispatch(sendMail(values));
  };
  
  
  @connect()
  @reduxForm({
    form: 'contact',
    fields: ['name', 'subject', 'email', 'message'],
    ...FormMessages.generateValidation(validations)
  })
  class ContactForm extends Component {
    render() {
      const {fields: {name, subject, email, message}, handleSubmit, submitting, valid, pristine} = this.props;
      var submitLabel = "Send";
      if (pristine) {
        submitLabel = "Fill in your message";
      } else if (submitting) {
        submitLabel = "Sending...";
      }
      return (
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label>Email</label>
            <input type="email" required="required" placeholder="Email" {...email}/>
            <FormMessages tagName="ul" display="1" field={email}>
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
          <div>
            <label>Name</label>
            <input type="text" required="required" placeholder="Name" {...name}/>
          </div>
          <div>
            <label>Subject</label>
            <input type="text" required="required" placeholder="Subject" {...subject}/>
  
            <FormMessages tagName="ul" display="1" field={subject}>
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
          <div>
            <label>Message</label>
            <input type="text" required="required" placeholder="Subject" {...message}/>
          </div>
          <button onClick={handleSubmit(submit)} >
            {submitLabel}
          </button>
        </form>
      );
    }
  }





```

