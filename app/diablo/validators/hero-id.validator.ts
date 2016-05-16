import { isEmpty, baseValidatorInterface } from './base.validator';

export var heroIdValidator: baseValidatorInterface = {
  validate: function(heroId: number) : boolean {
    if (isEmpty(heroId))
      throw "Hero ID is required";
      
    if (isNaN(heroId))
      throw "Hero ID must be a number";
      
    return true;
  }
};