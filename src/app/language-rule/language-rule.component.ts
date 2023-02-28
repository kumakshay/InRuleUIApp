import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-language-rule',
  templateUrl: './language-rule.component.html',
  styleUrls: ['./language-rule.component.css'],
  animations: [
    trigger('disabled', [
      state('true', style({ opacity: 0.5 })),
      state('false', style({ opacity: 1 })),
      transition('* => *', animate('300ms')),
    ]),
  ],
})
export class LanguageRuleComponent implements OnInit{

  constructor(private router: Router, private spinner: NgxSpinnerService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      else if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });
  }
  ngOnInit(): void {
    this.spinner.show();
  }

  editorOptions = {theme: 'vs-dark', language: 'python'};
  code: string= '## Write your python code here';


  }
  




