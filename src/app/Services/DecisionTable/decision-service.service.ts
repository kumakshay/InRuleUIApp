import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisionServiceService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }
  
  getDecisionRuleData(ruleName : string): Observable<any[]> {
    const headers = new HttpHeaders().set('tablename', ruleName);
    return this.http.get<any[]>(this.baseUrl + 'select', {headers}).pipe(catchError(this.errorHandler));
  }

  addNewRow(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "insert", data).pipe(catchError(this.errorHandler));
  }

  updateExistingRow(data: any): Observable<any> {
    var param = "?id=" + data.clientid;
    return this.http.put<any>(this.baseUrl + param, data).pipe(catchError(this.errorHandler));
  }

  //Deletion logic can be added here if future requirement comes
  // deleteData(id: number): Observable<any> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.delete<any>(url).pipe(catchError(this.errorHandler));
  // }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error(error.message || "Server Error"));
  }

}
