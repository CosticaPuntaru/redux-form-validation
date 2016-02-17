# redux-form-validation

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
* `field` : The `redux-form` field


example for how to use validator:

```javascript
   import React, {Component, PropTypes} from 'react';
   import {reduxForm} from 'redux-form';
   import {connect} from 'react-redux';
   import {sendMail} from 'redux/modules/email-to-support.js';
   import FormMessages from 'redux-form-validation';
   import {generateValidation} from 'redux-form-validation';
   
   var validations = {
     email: {
       validateOnBlur: true,
       required: true,
       minLength: 5,
       email: true,
       promise:function (fieldName, fieldValue, dispatch){
         return new Promise((resolve,reject) => {
           setTimeout(function (){
             if(fieldValue == 'example@example.com'){
               resolve()
             }else{
               reject('The mail must be example@example.com, "' + fieldValue '" given!')
             } 
           }, 1000)
         })
       }
     },
     name: {
       required: false
     },
     subject: {
       validateOnBlur: true,
       required: true,
       minLength: 5
     },
     message: {
       required: true,
       minLength: 10
     }
   };
   
   
   const submit = (values, dispatch) => {
     return dispatch(sendMail(values));
   };
   
   @connect()
   @reduxForm({
     form: 'contact',
     ...generateValidation(validations)
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
             <FormMessages tagName="ul" field={email}>
               <li when="promise">
                 {email.error && email.error.promise}
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
           <div>
             <label>Name</label>
             <input type="text" required="required" placeholder="Name" {...name}/>
           </div>
           <div>
             <label>Subject</label>
             <input type="text" required="required" placeholder="Subject" {...subject}/> 
             <FormMessages tagName="ul" errorCount="1" field={subject}>
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

