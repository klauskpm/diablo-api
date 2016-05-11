import { isString, baseValidatorInterface } from './base.validator';

export var localeValidator: baseValidatorInterface = {
  validate: function(value) {
    if (!isString(value))
      throw "Locale must be a string";
      
    return true;
  }
};