import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';


var validations = {
  email: {
    validateOnBlur: true,
    required: true,
    minLength: 5,
    email: true,
    promise: function (fieldName, fieldValue, dispatch) {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          if (fieldValue == 'example@example.com') {
            resolve()
          } else {
            reject('The mail must be example@example.com, "' + (fieldValue || 'none') + '" given!')
          }
        }, 1000)
      })
    }
  },
  retryEmail: {
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


export default class FormController extends Component {
  constructor() {
    super();
    this.state = {
      formValidate: {}
    };
    this.init();
  }

  init() {
    setTimeout(() => {
      this.setState({
        formValidate: generateValidation(validations)
      })
    }, 3000);
  }

  render() {
    if (!Object.keys(this.state.formValidate).length) {
      return (
        <div>
          loading....
        </div>
      )
    }
    return (
      <div>
        <ContactForm {...this.state.formValidate} />
      </div>
    )
  }
}

@connect()
@reduxForm({
  form: 'dynamicContact',
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
