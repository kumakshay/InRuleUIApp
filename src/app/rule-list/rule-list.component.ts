import { Component, OnInit} from '@angular/core';
import { IMainRuleDesc } from '../Interfaces/IMainRuleDesc';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import { NgxSpinnerService } from 'ngx-spinner';
import { RuleListService } from '../Services/RuleList/rule-list.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent  implements OnInit {

  //showSubRules: Boolean = false;  
  mainRuleData: IMainRuleDesc[] = [];
  subRuleData: any[] = [];
  ruleType : String = "";
  subRuleDesc : ISubRuleDesc | undefined;
  
  

  onNodeClicked(node: IMainRuleDesc): void {
   //Get the sub-rules based on the unique id of the parent-rule. 
   //The result coming from the backend will be already sorted based on order number.
  node.isExpanded = !node.isExpanded;
    this._ruleListService.getSubRulesOfMainRule(node.uniqueId).subscribe(
      data => {
           
        //Data Mapping of SubRules Rule data  
        //To Do: Optimize this mapping somehow
        node.subRules = [];
        for(let i = 0; i < data.length; i++) { 
          node.subRules[i] = 
          {
            uniqueId: data[i].unique_id,
            mainRuleId: data[i].parentid,
            ruleName: data[i].rulename,
            ruleType: data[i].ruletype,
            orderNo: data[i].orderno,
          };
        }
      }
      );
  console.log("This one " + node.subRules)
  }

  onSubNodeClicked(node : ISubRuleDesc): void {
    //fetch the data of the subrule using the subrule Id and the rule type
    this.ruleType = node.ruleType.toLowerCase(); 
    this.subRuleDesc = node;
    console.log(this.subRuleDesc);    
} 
  
  constructor(private spinner: NgxSpinnerService,private _ruleListService: RuleListService) {
    this.subRuleData = [];
  }

  ngOnInit(): void { 
    this._ruleListService.getMainRules().subscribe(
      data => {

        //Data Mapping of Main Rule data
        //To Do: Optimize this mapping somehow
        for(let i = 0; i < data.length; i++) { 
          this.mainRuleData[i] = 
          {
            uniqueId: data[i].unique_id,
            ruleName: data[i].rulename,
            isExpanded: false
          };

        }
      },
  );
  console.log("main rules" + this.mainRuleData)
  }
}
