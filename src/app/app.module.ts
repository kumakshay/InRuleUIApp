import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { DecisionComponent } from './decision/decision.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MatIconModule } from '@angular/material/icon';
import { LanguageRuleComponent } from './language-rule/language-rule.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
// import { MonacoEditorModule } from 'ngx-monaco-editor-v2';


@NgModule({
  declarations: [
    AppComponent,
    RuleListComponent,
    DecisionComponent,
    LanguageRuleComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    MatIconModule,
      ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
