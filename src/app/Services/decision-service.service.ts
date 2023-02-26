import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisionServiceService {
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  addData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateData(data: any): Observable<any> {
    const url = `${this.baseUrl}/${data.id}`;
    return this.http.put<any>(url, data);
  }

  deleteData(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
