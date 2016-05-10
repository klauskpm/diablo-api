import { isString, baseValidator } from './base.validator';

export var localeValidator: baseValidator = {
  validate: function(value) {
    if (!isString(value))
      throw "Locale must be a string";
      
    return true;
  }
};