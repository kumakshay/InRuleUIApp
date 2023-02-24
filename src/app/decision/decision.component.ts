import { Component, OnInit } from '@angular/core';
import { DecisionServiceService } from '../Services/decision-service.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-decision',
  templateUrl:'./decision.component.html',
  styleUrls: ['./decision.component.css']
})

export class DecisionComponent  implements OnInit {
  data: any[] | undefined;
  newItem: any = {};

  constructor(private decisionServiceService: DecisionServiceService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.decisionServiceService.getData().subscribe(data => {
      this.data = data;
    });
  }

  edit(item: any) {
    // TODO: Implement edit functionality
  }

  delete(id: number) {
    this.decisionServiceService.deleteData(id).subscribe(() => {
      this.getData();
    });
  }

  submit() {
    this.decisionServiceService.addData(this.newItem).subscribe(() => {
      this.getData();
      this.newItem = {};
    });
  }
  
}
