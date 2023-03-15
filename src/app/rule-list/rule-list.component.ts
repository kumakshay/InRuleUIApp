import { Component, Inject, OnInit} from '@angular/core';
import { IMainRuleDesc } from '../Interfaces/IMainRuleDesc';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import { NgxSpinnerService } from 'ngx-spinner';
import { RuleListService } from '../Services/RuleList/rule-list.service';
import { INotification } from '../Interfaces/INotification';
import { NgForm } from '@angular/forms';

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
  notification : INotification = {showNotification: false,  notificationValue : "NA", 
  notificationClassBootstrap : this.constants.bootstrapSuccessNotificationClass}
  //This variable will be holding the main rule id for which subrules are added 
  tempMainRule: any = {};
  modalSpinnerhide : boolean = true;
  isRuleListLoaded: boolean = false;


  onNodeClicked(node: IMainRuleDesc): void {
   //Get the sub-rules based on the unique id of the parent-rule. 
   //The result coming from the backend will be already sorted based on order number.
    node.isExpanded = !node.isExpanded;
    this.getSubRulesOfMainRule(node); 
  }

  getSubRulesOfMainRule(node: IMainRuleDesc)
  {
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
        
      });
  console.log("This one " + node.subRules)
  }
  onSubNodeClicked(node : ISubRuleDesc): void {
    //fetch the data of the subrule using the subrule Id and the rule type
    this.ruleType = node.ruleType.toLowerCase();
    this.subRuleDesc = node;
    console.log(this.subRuleDesc);    
} 
  
  constructor(private spinner: NgxSpinnerService,
    private _ruleListService: RuleListService,
    @Inject('Constants') private constants: any) {
    this.subRuleData = [];
  }

  getAllMainRules()
  {
    this.isRuleListLoaded = false;
    this._ruleListService.getMainRules().subscribe(
      data => {

        //Desc: Data Mapping of Main Rule data
        //To Do: Optimize this mapping somehow
        for(let i = 0; i < data.length; i++) { 
          this.mainRuleData[i] = 
          {
            uniqueId: data[i].unique_id,
            ruleName: data[i].rulename,
            isExpanded: false,
            subRules: [{uniqueId: "NA", mainRuleId: "NA", ruleName: "NA", ruleType: "NA",orderNo: 9999}]
          };

          this.isRuleListLoaded = true;

        }
      },
  );
  console.log("main rules" + this.mainRuleData)
  }


  ngOnInit(): void { 
    this.getAllMainRules();
  }

  setTheParentForWhichSubruleIsToBeAdded(parent : IMainRuleDesc)
  {
    this.tempMainRule = parent;
    // this.tempMainRule = {
    //   uniqueId: parent.uniqueId,
    //   ruleName: parent.ruleName,
    //   subRules: parent.subRules,
    //   isExpanded: parent.isExpanded
    // }
    console.log(this.tempMainRule);
  }; 
  
  addNewSubRuleDesc(form: NgForm)
  {
    this.modalSpinnerhide = false;
    var newSubRuleDesc = { 
      
      "table" : "subrules", 
      "data" : 
      {
        "parentid" : this.tempMainRule.uniqueId,
        "rulename" : form.value.ruleName,
        "ruletype": form.value.ruleTypes,
        "orderno": this.getOrderNumberOfSubrule(this.tempMainRule.subRules),
      }
    };

    this._ruleListService.addNewSubRuleForMainRule(newSubRuleDesc).subscribe( 
      
      data => {
  
          if(data.status == "Inserted Successfully")
          {
            this.modalSpinnerhide = true;
            this.notification.notificationClassBootstrap = this.constants.bootstrapSuccessNotificationClass;
            this.notification.notificationValue = this.constants.rowSaveSuccessMessage;
            this.notification.showNotification = true;
            form.resetForm();
            this.getSubRulesOfMainRule(this.tempMainRule);
            setTimeout(() => {
              this.notification.showNotification = false;
            }, 3000); 
          }  
          else
          {
            this.modalSpinnerhide = true;
            this.notification.notificationClassBootstrap = this.constants.bootstrapErrorNotificationClass;
            this.notification.notificationValue = this.constants.rowSaveErrorMessage;
            this.notification.showNotification = true;
            setTimeout(() => {
              this.notification.showNotification = false;
            }, 3000); 
          }
          },
  
        Error=> {
          this.modalSpinnerhide = true;
          this.notification.notificationClassBootstrap = this.constants.bootstrapErrorNotificationClass;
          this.notification.notificationValue = this.constants.connectionErrorMessage;
          this.notification.showNotification = true;
          setTimeout(() => {
            this.notification.showNotification = false;
          }, 3000); 
          console.log(Error)
        }  
          
      );
  }
  //It gives the order number for the new subrule created.
  getOrderNumberOfSubrule(subRules: any[]) : number
  {
      var val = 0;

      val = subRules[subRules.length - 1].orderNo;
      
      if(val == 9999)
      {
        val = subRules[subRules.length - 2].orderNo;
      }
      return ++val;
  }
}
