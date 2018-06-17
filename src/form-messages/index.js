import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class FormMessages extends PureComponent {
  static defaultProps = {
    errorCount: -1,
    tagName: 'div'
  };

  static propTypes = {
    meta: PropTypes.object.isRequired,
    tagName: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    errorCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  renderChildren(children, meta, errorCount) {
    const {error, touched} = meta;

    if (touched && error) {
      const errorList = React.Children.toArray(children)
        .filter(function (child) {
          return child.props.when && error[child.props.when]
        });

      const displayErrorCount = parseInt(errorCount, 10);
      if (displayErrorCount < 0) {
        return errorList;
      }
      return errorList.slice(0, displayErrorCount);
    }
  }

  render() {
    const {children, meta, errorCount, tagName: TagName, ...rest} = this.props;
    const errorList = this.renderChildren(children, meta, errorCount);

    if (!errorList || !errorList.length) {
      return null;
    }

    return (
      <TagName {...rest}>
        {errorList}
      </TagName>
    )
  }
};
