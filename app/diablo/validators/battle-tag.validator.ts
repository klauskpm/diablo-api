import { isString, isEmpty, baseValidator } from './base.validator';

export var battleTagValidator: baseValidator = {
  validate: function(battleTag: string) : boolean {
    if (isEmpty(battleTag))
      throw "BattleTag is required";
      
    if (!isString(battleTag))
      throw "BattleTag must be a string";
      
    if (!/(\w+)-(\d+)/ig.test(battleTag))
      throw "BattleTag is not in a valid format. Battle Tag in name-#### format (ie. Noob-1234)";
      
    return true;
  }
};