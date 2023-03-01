import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import { NgxSpinnerService } from 'ngx-spinner';



//declare const monaco: any;
@Component({
  selector: 'app-language-rule',
  templateUrl: './language-rule.component.html',
  styleUrls: ['./language-rule.component.css'],
})
export class LanguageRuleComponent implements OnInit{

  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript'
  };
  code = '';
  loading = true;


  constructor(private spinner: NgxSpinnerService) {
    
  }


  ngOnInit() {
    this.spinner.show();
}


onMonacoEditorInit(): void {
  this.spinner.hide();
} 



  // editorOptions = {theme: 'vs-dark', language: 'python'};
  // code: string= '## Write your python code here';

  }
  




