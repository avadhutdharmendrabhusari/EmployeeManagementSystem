import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = `${environment.apiUrl}/Department`;

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getDepartmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetById/${id}`);
  }

  addDepartment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add`, data);
  }

  updateDepartment(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }
}