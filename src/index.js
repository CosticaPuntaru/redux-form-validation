import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {generateValidation, addValidation, addMultipleValidations} from './validation.js';

export default class FormMessages extends Component {
  static generateValidation = generateValidation;
  static addValidation = addValidation;
  static addMultipleValidations = addMultipleValidations;

  static propTypes = {
    field: PropTypes.object.isRequired,
    display: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
  static defaultProps = {
    display: -1,
    tagName: 'div'
  };

  renderChildren() {
    const {children, field, display, tagName} = this.props;
    if (children && children.length && field && field.touched && field.error) {
      var toBeDisplayed = [];
      var errorCount = 0;
      for (let i in children) {
        let child = children[i];
        if (child.props.when && field.error[child.props.when]) {
          toBeDisplayed.push(child);
          errorCount++;
          if (display > 0 && errorCount >= display) {
            break;
          }
        }
      }
      return toBeDisplayed;
    }
  }

  render() {
    const {children, field, display, tagName, ...rest} = this.props;
    return (
      <this.props.tagName {...rest}>
        {this.renderChildren()}
      </this.props.tagName>
    )
  }
};
