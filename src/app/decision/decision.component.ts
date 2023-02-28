import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import { DecisionServiceService } from '../Services/DecisionTable/decision-service.service';
@Component({
  selector: 'app-decision',
  templateUrl:'./decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent  implements OnInit {

  @Input() subRuleDesc: ISubRuleDesc | undefined ;
  data: any[] | undefined;
  newItem: any = {};
  item: any = {};
  rowObjectForEdit: any = {};
  showSuccessNotification : boolean = false;
  constructor(private decisionServiceService: DecisionServiceService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.decisionServiceService.getData().subscribe(data => {
      
      this.data = data;
      
    });
  }
  
  //1. Once the edit button is clicked this function will be triggered.
  //2. This will set the row object which is to be updated. 
  setRowObjectForEdit(item: any)
  {
    this.rowObjectForEdit = item;
  }

  edit() {
    // TODO: Implement edit functionality
    console.log(this.rowObjectForEdit);
    this.decisionServiceService.updateData(this.rowObjectForEdit.id).subscribe(() => {
      this.getData();
    });
    this.showSuccessNotification = true;
    setTimeout(() => {
      this.showSuccessNotification = false;
   }, 3000);
  }

  delete(id: number) {
    console.log(id);
    this.decisionServiceService.deleteData(id).subscribe(() => {
      this.getData();
    });
  }

  //Adding a row
  add() {
    this.decisionServiceService.addData(this.newItem).subscribe(() => {
      this.getData();
      this.newItem = {};
    });

    this.showSuccessNotification = true;
    setTimeout(() => {
      this.showSuccessNotification = false;
   }, 3000);
  }
  
}
