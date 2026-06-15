import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';

import {
  ChartConfiguration,
  ChartType
} from 'chart.js';

import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardData: any;

  recentEmployees: any[] = [];

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [0, 0]
      }
    ]
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Employees',
        data: []
      }
    ]
  };

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadDashboard();

    this.loadDepartmentChart();

    this.loadRecentEmployees();

  }

  loadDashboard(): void {

    this.dashboardService
      .getDashboard()
      .subscribe({

        next: (res) => {

          this.dashboardData = res;

          this.pieChartData = {

            labels: ['Active', 'Inactive'],

            datasets: [
              {
                data: [
                  res.activeEmployees,
                  res.inactiveEmployees
                ]
              }
            ]

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadDepartmentChart(): void {

    this.dashboardService
      .getDepartmentChart()
      .subscribe({

        next: (res) => {

          this.barChartData = {

            labels:
              res.map(
                (x: any) =>
                  x.departmentName
              ),

            datasets: [

              {
                label: 'Employees',

                data:
                  res.map(
                    (x: any) =>
                      x.employeeCount
                  )
              }

            ]

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadRecentEmployees(): void {

    this.dashboardService
      .getRecentEmployees()
      .subscribe({

        next: (res) => {

          this.recentEmployees = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ==========================
  // DRILL DOWN METHODS
  // ==========================

  goToEmployees(): void {

    this.router.navigate(
      ['/employee']
    );

  }

  goToDepartments(): void {

    this.router.navigate(
      ['/department']
    );

  }

  goToActiveEmployees(): void {

    this.router.navigate(
      ['/employee'],
      {
        queryParams: {
          status: 1
        }
      }
    );

  }

  goToInactiveEmployees(): void {

    this.router.navigate(
      ['/employee'],
      {
        queryParams: {
          status: 0
        }
      }
    );

  }

}