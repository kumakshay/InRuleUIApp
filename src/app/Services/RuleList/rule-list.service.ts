import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ISubRuleDesc } from 'src/app/Interfaces/ISubRuleDesc';
import { IMainRuleDesc } from 'src/app/Interfaces/IMainRuleDesc';

@Injectable({
  providedIn: 'root'
})
export class RuleListService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  getSubRulesOfMainRule(mainRuleId : string): Observable<any[]> {
    var param = "?id=" + mainRuleId;
    let tempVar = this.http.get<any[]>(this.baseUrl + "getSubRuleById" + param).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getMainRules(): Observable<any[]>
  {
    let tempVar = this.http.get<any[]>(this.baseUrl + "select").pipe(catchError(this.errorHandler));
    return tempVar;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error(error.message || "Server Error"));
  }

}
