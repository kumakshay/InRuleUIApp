import { Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNodeOutlet} from '@angular/material/tree';
import { IMainRuleDesc } from '../Interfaces/IMainRuleDesc';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import * as $ from 'jquery';
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
  //   this._ruleListService.getSubRulesOfMainRule(node.uniqueId).subscribe(
  //     data => {
  //          this.subRuleDesc = data;
  //          console.log("This one is the data" + data)
  //         },
  // );
  //console.log("This one " + node.subRules)
    if(node.uniqueId == "fcd7f92e-2a4e-4fab-8a6a-637ff0796a0b")
    {
        node.subRules = [
          {
            uniqueId: "fcd7f92e-2a4e-4fab-8a6a-637ff0796a0b", 
            mainRuleId: "87273fff-2990-498e-926e-5cd2e50ef829", 
            ruleName: "ClientTurnOn", 
            ruleType: "DT",
            orderNo:1
          },
          {
            uniqueId: "b6c1bf63-fa24-422d-9362-6aac99b861a7", 
            mainRuleId: "87273fff-2990-498e-926e-5cd2e50ef829", 
            ruleName: "isClientTurnedOn", 
            ruleType: "LR",
            orderNo:2
          }
      ];
    }
  }

  onSubNodeClicked(node : ISubRuleDesc): void {
    //fetch the data of the subrule using the subrule Id and the rule type
    this.ruleType = node.ruleType; 
    this.subRuleDesc = node;
    console.log(this.subRuleDesc);    
} 
  
  constructor(private _ruleListService: RuleListService) {
    this.subRuleData = [];
  }

  ngOnInit(): void {

    //This jquery code is to toggle the tree
   // $(document).ready(function() {
      // Hide all nested lists by default
      //$('#tree1 ul').hide();
    
      // Add click event to each node
    //   $('#tree1 li').click(function(e) {
    //     if ($(this).children('ul').length > 0) { // Check if clicked element is a parent node
    //       // Toggle the nested list
    //       $(this).children('ul').toggle();
    //       e.stopPropagation(); // Stop event bubbling
    //     }
    //   });
    
    //   // Add click event to each nested list item
    //   $('#tree1 li ul li').click(function(e) {
    //     e.stopPropagation(); // Stop event bubbling
    //   });
    // });
    
    this.mainRuleData = [
      {
          uniqueId : "fcd7f92e-2a4e-4fab-8a6a-637ff0796a0b", 
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
 



