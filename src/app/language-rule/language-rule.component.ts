import { Component, Input, OnInit, Inject, OnChanges, SimpleChanges} from '@angular/core';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageRuleService } from '../Services/LanguageRule/language-rule.service';
import { INotification } from '../Interfaces/INotification';

@Component({
  selector: 'app-language-rule',
  templateUrl: './language-rule.component.html',
  styleUrls: ['./language-rule.component.css'],
})
export class LanguageRuleComponent implements OnInit, OnChanges{

  @Input() subRuleDesc: any;
  editorOptions = {
    theme: 'vs-dark',
    language: 'python'
  };
  code : string = '';
  loader: boolean = false;

  notification : INotification = {showNotification: false, notificationValue : "NA", notificationClassBootstrap : this.constants.bootstrapSuccessNotificationClass};

  constructor(private spinner: NgxSpinnerService, 
    private _languageRuleService : LanguageRuleService, 
    @Inject('Constants') private constants: any) {

    

  }
  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in the input property and update nodeType and subRuleDesc accordingly
    if (changes['subRuleDesc'] && changes['subRuleDesc'].currentValue) {
      this.getLanguageRuleData();
    }
  }
  
  ngOnInit() {
    this.spinner.show();
    this.getLanguageRuleData();
    
}

getLanguageRuleData()
{
    //Getting the rule data 
    this._languageRuleService.getLanguageRuleData(this.subRuleDesc.ruleName).subscribe(
      
      data => {
      this.code = data.languageRule;
      console.log(data.languageRule);
    });
}
saveLanguageRule() : void {
  this._languageRuleService.saveLanguageRule(this.subRuleDesc.ruleName, this.code).subscribe(
    data => {

    if(this.code == data.code)
    {
      this.code = data.code; 
      console.log(data.code);
      this.notification.notificationValue = this.constants.codeSaveSuccessMessage;
      this.notification.showNotification = true;
      this.notification.notificationClassBootstrap = this.constants.bootstrapSuccessNotificationClass;
      setTimeout(() => {
      this.notification.showNotification = false;
     }, 3000);
    }
    else
    {
      this.notification.notificationClassBootstrap = this.constants.bootstrapErrorNotificationClass;
      this.notification.notificationValue = this.constants.codeSaveErrorMessage;
      this.notification.showNotification = true;
      setTimeout(() => {
      this.notification.showNotification = false;
     }, 3000);
    }  
  },
  Error => {
    this.notification.notificationClassBootstrap = this.constants.bootstrapErrorNotificationClass;
    this.notification.notificationValue = this.constants.connectionErrorMessage;
    this.notification.showNotification = true;
    setTimeout(() => {
    this.notification.showNotification = false;
   }, 3000);
   console.log("saveLanguageRule ->" + Error)
  }
  );

}

onMonacoEditorInit(): void {
  this.spinner.hide();
} 

}
  




