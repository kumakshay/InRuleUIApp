import { Component, OnInit, Input, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { INotification } from '../Interfaces/INotification';
import { DecisionServiceService } from '../Services/DecisionTable/decision-service.service';
@Component({
  selector: 'app-decision',
  templateUrl:'./decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent  implements OnInit {

  @Input() subRuleDesc: any;
  tableData: any[] = [{}];
  item: any = {};
  rowObjectForEdit: any = {};
  notification : INotification = {showNotification: false,  notificationValue : "NA", notificationClassBootstrap : this.constants.bootstrapSuccessNotificationClass}
  modalSpinnerhide : boolean = true;
  isDecisionTableLoaded : boolean = false;
  constructor(private decisionServiceService: DecisionServiceService,
    @Inject('Constants') private constants: any) {
  }

  ngOnInit() {
    this.getDecisionRuleData();
  }

  getDecisionRuleData() {
    this.isDecisionTableLoaded = false;
    this.decisionServiceService.getDecisionRuleData(this.subRuleDesc.ruleName).subscribe(
      data => {
      this.tableData = data;
      this.isDecisionTableLoaded = true;
      console.log(this.tableData)
      
    });
    
  }
  
  //1. Once the edit button is clicked this function will be triggered.
  //2. This will set the row object which is to be updated. 
  setRowObjectForEdit(item: any)
  {
    this.rowObjectForEdit = item;
  }

  updateExistingRow(form: NgForm) {
    
    this.modalSpinnerhide = false;
    this.rowObjectForEdit.stateofissuance = form.value.stateofissuance;
    this.rowObjectForEdit.allowed = form.value.allowed;
    console.log(this.rowObjectForEdit);
    this.decisionServiceService.updateExistingRow(this.rowObjectForEdit).subscribe(data => {
      
      console.log(data);
      if(data.status == "Updated Successfully")
      {
        this.modalSpinnerhide = true;
        this.notification.notificationClassBootstrap = this.constants.bootstrapSuccessNotificationClass;
        this.notification.notificationValue = this.constants.rowSaveSuccessMessage;
        this.notification.showNotification = true;
        form.resetForm();
        
        setTimeout(() => {
          this.notification.showNotification = false;
        }, 3000);  
        this.getDecisionRuleData();
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
    });
  }

  //Deleting a row -> Logic can be added if required in future
  // delete(id: number) {
  //   console.log(id);
  //   this.decisionServiceService.deleteData(id).subscribe(() => {
  //     this.getDecisionRuleData();
  //   });
  // }

  addNewRow(form: NgForm) {
    this.modalSpinnerhide = false;    
    //To Do. In future we will have to replace these string properties with the actions or the cloumn names
    //The actions will have all the columns present for a particluar table rule.
    //On the basis of the cloumn names the response will be created and the mapping will be done.
    var newRow = { 
      
    "table" : this.subRuleDesc.ruleName, 
    "data" : 
    {
      "clientid" : form.value.clientid,
      "stateofissuance" : form.value.stateofissuance,
      "allowed": form.value.allowed,
      "orderno": this.getOrderNumber()
    }
  };
    this.decisionServiceService.addNewRow(newRow).subscribe( 
      
    data => {

        if(data.status == "Inserted Successfully")
        {
          this.modalSpinnerhide = true;
          this.notification.notificationClassBootstrap = this.constants.bootstrapSuccessNotificationClass;
          this.notification.notificationValue = this.constants.rowSaveSuccessMessage;
          form.resetForm();
          this.getDecisionRuleData();
          this.notification.showNotification = true;
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

  getOrderNumber() : number
  {
      var val = 0;

      val = this.tableData[this.tableData.length - 1].orderno;
      if(val == 9999)
      {
        val = this.tableData[this.tableData.length - 2].orderno;
      }
      return ++val;
  }
  
}
