import basicValidations from './basic-validations.js'

var validationStore = {};

export function addValidation(key, fn) {
  validationStore[key] = fn;
}

export function addMultipleValidations(obj) {
  Object.keys(obj).forEach((key)=>addValidation(key, obj[key]))
}

addMultipleValidations(basicValidations);

export function generateValidation(validationConfig) {
  return {
    asyncValidate: (values) => {
      var promiseList = [Promise.resolve()];
      var errors = {};

      function addError(field, validatorName) {
        if (!errors[field]) {
          errors[field] = {
            [validatorName]: true
          };
        } else {
          errors[field][validatorName] = true;
        }
      }

      Object.keys(validationConfig).map((fieldName) => {
        var validation = validationConfig[fieldName];
        Object.keys(validation).map((validationType) => {
          if(typeof validationStore[validationType] != 'function'){
            return;
          }
          var xxx = validationStore[validationType](fieldName, values[fieldName], validation[validationType]);
          if (typeof xxx.then === 'function') {
            promiseList.push(new Promise((resolve, reject)=> {
              xxx.then(resolve, (msg) => {
                addError(fieldName, validationType);
                resolve()
              })
            }))

          } else if (xxx) {
            addError(fieldName, validationType);
          }
        })
      });
      return Promise.all(promiseList).then(()=> {
        if (Object.keys(errors).length) {
          return Promise.reject(errors);
        }
      });

    },
    asyncBlurFields: Object.keys(validationConfig).filter((fieldName) =>{
      return validationConfig[fieldName].validateOnBlur
    })
  }
}