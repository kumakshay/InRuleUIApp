import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubRuleDesc } from 'src/app/Interfaces/ISubRuleDesc';

@Injectable({
  providedIn: 'root'
})
export class RuleListService {
  subRuleData: any = [];
  private readonly baseUrl = 'http://localhost:3000/subRules';
  constructor(private http: HttpClient) { }

  getSubRulesOfMainRule(mainRuleId : string): Observable<any[]> {
    
    return this.http.get<any[]>(this.baseUrl);
  }

}
