import React, { Component } from 'react';
import ContactForm from './contact-form';
import DynamicValidation from './dynamic-validation';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to redux-form-validation</h1>
        <h2>Simple validation</h2>
        <ContactForm />
        <br/>
        <h2>dynamic validation</h2>
        <DynamicValidation />
      </div>
    );
  }
}
