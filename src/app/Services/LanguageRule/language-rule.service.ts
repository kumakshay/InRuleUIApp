import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageRuleService {

  private readonly baseUrl = 'http://127.0.0.1:5000/'; 
  constructor(private http: HttpClient) { }


  getLanguageRuleData(ruleName : string): Observable<any>
  {
    const headers = new HttpHeaders().set('languageRule', ruleName);
    let tempVar = this.http.get<any>(this.baseUrl + "getLanguageRuleByName",{headers}).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  saveLanguageRule(ruleName : string, code : string): Observable<any>
  {
    let tempVar = this.http.post<any>(this.baseUrl + "saveLanguageRule", 
    {"rulename": ruleName, "code": code}).pipe(catchError(this.errorHandler));
    return tempVar;
  }
  
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error(error.message || "Server Error"));
  }
}
