import React, {Component, PropTypes} from 'react';

export default class FormMessages extends Component {

    renderChildren() {
        const {children, field, errorCount} = this.props;
        if (children && children.length && field && field.touched && field.error) {
            var display = parseInt(errorCount, 10);
            var toBeDisplayed = [];
            var currentErrorCount = 0;
            for (let i in children) {
                let child = children[i];
                if (child.props.when && field.error[child.props.when]) {
                    toBeDisplayed.push(child);
                    currentErrorCount++;
                    if (display > 0 && currentErrorCount >= display) {
                        break;
                    }
                }
            }
            return toBeDisplayed;
        }
    }

    render() {
        const {children, field, errorCount, tagName, ...rest} = this.props;
        const errorElements = this.renderChildren();
        //if (!errorElements || !errorElements.length) {
        //    return false;
        //}
        return (
            <this.props.tagName {...rest}>
                {errorElements}
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