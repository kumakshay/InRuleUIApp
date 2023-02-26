import { Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNodeOutlet} from '@angular/material/tree';
import { IMainRuleDesc } from '../Interfaces/IMainRuleDesc';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import * as $ from 'jquery';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent  implements OnInit {

  showSubRules: Boolean = false;  
  mainRuleData: IMainRuleDesc[] = [];
  subRuleData: ISubRuleDesc[] = [];

  onNodeClicked(node: IMainRuleDesc): void {

   //Get the sub-rules based on the unique id of the parent-rule. 
   //The result coming from the backend will be already sorted based on order number.
   if(node.uniqueId == "1")
   {
    this.subRuleData = [
      {
        uniqueId : "1s", 
        mainRuleId: "1",
        ruleName: "ChildRule1",
        ruleType: "DT",
        orderNo: 1
      },
      {
        uniqueId : "2s", 
        mainRuleId: "1",
        ruleName: "ChildRule2",
        ruleType: "DT",
        orderNo: 2
      },
      {
        uniqueId : "3s", 
        mainRuleId: "1",
        ruleName: "ChildRule3",
        ruleType: "LR",
        orderNo: 3
      },
      {
        uniqueId : "4s", 
        mainRuleId: "1",
        ruleName: "ChildRule4",
        ruleType: "LR",
        orderNo: 4
      }
     ];

     node.subRules = this.subRuleData;
   }
  

  if(node.subRules?.length! > 0)
  {
    node.isExpanded = true;
  }
  
  
  console.log(this.subRuleData)
    
  }

  
  constructor() {
    this.subRuleData = [];

  }

  ngOnInit(): void {
    

    this.mainRuleData = [
      {
          uniqueId : "1", 
          ruleName: "Mainrule1",
          isExpanded: false
        
      },
      {
          uniqueId : "2", 
          ruleName: "Mainrule2",
          isExpanded: false

      },
      {
          uniqueId : "3", 
          ruleName: "Mainrule3",
          isExpanded: false
      },
      {
          uniqueId : "4", 
          ruleName: "Mainrule4",
          isExpanded: false
      },
    ];
    

  }
}



/* private _transformer = (node: IMainRuleDesc, level: number) => {
    return {
      expandable: !!node.childRules && node.childRules.length  > 0,
      name: node.ruleName,
      level: level,
    };
  };
 
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node
  );
  
  //node => node.childRules
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener); */
  //hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
 



