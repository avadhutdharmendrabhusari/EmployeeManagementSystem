import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Chart,
  registerables
} from 'chart.js';
Chart.register(...registerables);
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/Dashboard`;

  constructor(
    private http: HttpClient
  ) { }

  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetDashboard`);
  }

  getDepartmentChart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/DepartmentChart`);
  }

  getRecentEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/RecentEmployees`);
  }
}