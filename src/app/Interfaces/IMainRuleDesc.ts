import { ISubRuleDesc } from "./ISubRuleDesc"

export interface IMainRuleDesc{
    uniqueId : string,
    ruleName: string,
    subRules?: ISubRuleDesc[],
    isExpanded: Boolean,
  }