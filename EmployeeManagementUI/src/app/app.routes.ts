import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepartmentComponent } from './pages/department/department.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ReportComponent } from './pages/report/report.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { LayoutComponent } from './shared/layout/layout.component';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'profile',
        component: ProfileComponent
      },

      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [adminGuard]
      },

      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [adminGuard]
      },

      {
        path: 'report',
        component: ReportComponent,
        canActivate: [adminGuard]
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];