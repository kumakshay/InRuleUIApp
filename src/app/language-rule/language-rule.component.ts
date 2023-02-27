import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ISubRuleDesc } from '../Interfaces/ISubRuleDesc';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-language-rule',
  templateUrl: './language-rule.component.html',
  styleUrls: ['./language-rule.component.css']
})
export class LanguageRuleComponent implements OnInit {
  @ViewChild('editor') private editor: any;
  @Input() subRuleDesc: ISubRuleDesc | undefined ;
  codeMirrorOptions: any = {};
  code : string = "";

  ngOnInit() 
    {
      // CodeMirror.fromTextArea(this.editor.nativeElement, {
      //   lineNumbers: true,
      //   mode: 'python',
      // });   
}

  }
  




