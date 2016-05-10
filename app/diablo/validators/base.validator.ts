export function isString(value) {
  return typeof value === 'string';
};

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isNull(value) {
  return value === null;
}

export function isEmpty(value) {
  if (isUndefined(value))
    return true;
    
  if (isNull(value))
    return true;
  
  if (isString(value))
    return value === '';
  
  if (Array.isArray(value))
    return !value.length;
  
  return false;
}

export interface baseValidator {
  validate: Function
}