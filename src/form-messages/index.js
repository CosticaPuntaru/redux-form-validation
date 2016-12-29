import React, {PureComponent, PropTypes} from 'react';

export default class FormMessages extends PureComponent {

  renderChildren(children, field, errorCount) {
    var error = field && (field.error || (field.meta && field.meta.error));
    var touched = field && (field.touched || (field.meta && field.meta.touched));
    if (touched && error) {
      var errorList = React.Children.toArray(children)
        .filter(function (child) {
          return child.props.when && error[child.props.when]
        });

      var displayErrorCount = parseInt(errorCount, 10);
      if (displayErrorCount < 0) {
        return errorList;
      }
      return errorList.slice(0, displayErrorCount);
    }
  }

  render() {
    const {children, field, errorCount, tagName, ...rest} = this.props;

    return (
      <this.props.tagName {...rest}>
        { this.renderChildren(children, field, errorCount)}
      </this.props.tagName>
    )
  }
};

FormMessages.propTypes = {
  field: PropTypes.object.isRequired,
  tagName: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  errorCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

FormMessages.defaultProps = {
  errorCount: -1,
  tagName: 'div'
};
