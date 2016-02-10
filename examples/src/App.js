import React, { Component } from 'react';
import ContactForm from './contact-form';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to redux-form-validation</h1>
        <ContactForm />
      </div>
    );
  }
}