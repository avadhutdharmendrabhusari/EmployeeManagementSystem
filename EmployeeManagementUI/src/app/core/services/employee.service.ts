import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/Employee`;

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetById/${id}`);
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add`, data);
  }

  updateEmployee(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }
  getMyProfile() {

  return this.http.get(
    `${this.apiUrl}/MyProfile`
  );

}
}