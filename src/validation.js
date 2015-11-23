import basicValidations from './basic-validations.js'
import isPromise from 'is-promise';
var validationStore = {};

export function addValidation(key, fn) {
    validationStore[key] = fn;
}

export function addMultipleValidations(obj) {
    Object.keys(obj).forEach((key)=> addValidation(key, obj[key]))
}

addMultipleValidations(basicValidations);


export function generateAsyncValidation(validationConfig) {
    return (values, dispatch) => {
        var promiseList = [Promise.resolve()];
        var errors = {};

        function addError(field, validatorName, message = true) {
            if (!errors[field]) {
                errors[field] = {};
            }
            errors[field][validatorName] = message;

        }

        Object.keys(validationConfig).map((fieldName) => {
            var validation = validationConfig[fieldName];
            if (typeof validation === 'object') {
                Object.keys(validation).map((validationType) => {
                    if (typeof validationStore[validationType] != 'function') {
                        return;
                    }
                    var hasError = validationStore[validationType](fieldName, values[fieldName], validation[validationType], dispatch);
                    if (isPromise(hasError)) {
                        promiseList.push(new Promise((resolve, reject)=> {
                            hasError.then(resolve).catch((msg) => {
                                console.log('promise has error', msg);
                                addError(fieldName, validationType, msg);
                                resolve();
                            })
                        }))

                    } else if (hasError) {
                        addError(fieldName, validationType, hasError);
                    }
                })
            }
        });
        return Promise.all(promiseList).then(()=> {
            if (Object.keys(errors).length) {
                return Promise.reject(errors);
            }
        });
    }
}

export function generateAsyncBlurFields(validationConfig) {
    return Object.keys(validationConfig).filter((fieldName) => {
        return typeof(validationConfig[fieldName]) === 'object' && validationConfig[fieldName].validateOnBlur
    })
}

export function generateValidation(validationConfig) {
    return {
        asyncValidate: generateAsyncValidation(validationConfig),
        asyncBlurFields: generateAsyncBlurFields(validationConfig),
        fields: Object.keys(validationConfig)
    }
}