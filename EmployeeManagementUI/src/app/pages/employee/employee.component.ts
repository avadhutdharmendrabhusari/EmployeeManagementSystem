import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];

  allEmployees: any[] = [];

  departments: any[] = [];

  showForm = false;

  isEditMode = false;

  // Pagination

  currentPage = 1;

  pageSize = 5;

  employee = {

    employeeId: 0,

    employeeCode: '',

    employeeName: '',

    departmentId: 0,

    designation: '',

    email: '',

    mobileNo: '',

    joiningDate: '',

    status: true

  };

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadEmployees();

    this.loadDepartments();

  }

  get pagedEmployees() {

    const start =
      (this.currentPage - 1) * this.pageSize;

    const end =
      start + this.pageSize;

    return this.employees.slice(
      start,
      end
    );

  }

  get totalPages() {

    return Math.ceil(
      this.employees.length /
      this.pageSize
    );

  }

  loadEmployees(): void {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (res) => {

          this.allEmployees = res;

          this.route.queryParams
            .subscribe(params => {

              const status =
                params['status'];

              if (
                status !== undefined
              ) {

                this.employees =
                  this.allEmployees.filter(
                    (x: any) =>
                      Number(x.status) === Number(status)
                  );

              }
              else {

                this.employees =
                  this.allEmployees;

              }

            });

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadDepartments(): void {

    this.departmentService
      .getAllDepartments()
      .subscribe({

        next: (res) => {

          this.departments = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  openForm(): void {

    this.showForm = true;

    this.isEditMode = false;

    this.resetEmployee();

  }

  closeForm(): void {

    this.showForm = false;

    this.isEditMode = false;

    this.resetEmployee();

  }

  resetEmployee(): void {

    this.employee = {

      employeeId: 0,

      employeeCode: '',

      employeeName: '',

      departmentId: 0,

      designation: '',

      email: '',

      mobileNo: '',

      joiningDate: '',

      status: true

    };

  }

  saveEmployee(): void {

    // Employee Name

    if (!this.employee.employeeName.trim()) {

      Swal.fire(
        'Validation',
        'Employee Name is required',
        'warning'
      );

      return;

    }

    // Department

    if (
      this.employee.departmentId === 0
    ) {

      Swal.fire(
        'Validation',
        'Please Select Department',
        'warning'
      );

      return;

    }

    // Designation

    if (
      !this.employee.designation.trim()
    ) {

      Swal.fire(
        'Validation',
        'Designation is required',
        'warning'
      );

      return;

    }

    // Email

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        this.employee.email
      )
    ) {

      Swal.fire(
        'Validation',
        'Enter Valid Email',
        'warning'
      );

      return;

    }

    // Mobile

    if (
      !/^[0-9]{10}$/.test(
        this.employee.mobileNo
      )
    ) {

      Swal.fire(
        'Validation',
        'Mobile Number Must Be 10 Digits',
        'warning'
      );

      return;

    }

    // Joining Date

    if (
      !this.employee.joiningDate
    ) {

      Swal.fire(
        'Validation',
        'Joining Date Required',
        'warning'
      );

      return;

    }

    // UPDATE

    if (this.isEditMode) {

      this.employeeService
        .updateEmployee(
          this.employee
        )
        .subscribe({

          next: () => {

            Swal.fire(
              'Success',
              'Employee Updated Successfully',
              'success'
            );

            this.loadEmployees();

            this.closeForm();

          },

          error: (err) => {

  console.log('UPDATE ERROR =>', err);

  console.log('STATUS =>', err.status);

  console.log('ERROR BODY =>', err.error);

  Swal.fire(
    'Error',
    'Unable To Update Employee',
    'error'
  );

}

        });

      return;

    }

    // ADD

    this.employeeService
      .addEmployee(
        this.employee
      )
      .subscribe({

        next: () => {

          Swal.fire(
            'Success',
            'Employee Added Successfully',
            'success'
          );

          this.loadEmployees();

          this.closeForm();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  editEmployee(emp: any): void {

    this.showForm = true;

    this.isEditMode = true;

    this.employeeService
      .getEmployeeById(
        emp.employeeId
      )
      .subscribe({

        next: (res) => {

          this.employee = {

            employeeId:
              res.employeeId,

            employeeCode:
              res.employeeCode,

            employeeName:
              res.employeeName,

            departmentId:
              Number(
                res.departmentId
              ),

            designation:
              res.designation,

            email:
              res.email,

            mobileNo:
              res.mobileNo,

            joiningDate:
              res.joiningDate
                ? res.joiningDate
                    .split('T')[0]
                : '',

            status:
              res.status

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  deleteEmployee(
    id: number
  ): void {

    const emp =
      this.employees.find(
        x =>
          x.employeeId === id
      );

    if (
      emp &&
      !emp.status
    ) {

      Swal.fire(
        'Info',
        'Employee Already Inactive',
        'info'
      );

      return;

    }

    Swal.fire({

      title:
        'Are You Sure?',

      text:
        'Employee Will Be Marked Inactive',

      icon:
        'warning',

      showCancelButton:
        true

    })
    .then((result) => {

      if (
        result.isConfirmed
      ) {

        this.employeeService
          .deleteEmployee(id)
          .subscribe({

            next: () => {

              Swal.fire(
                'Success',
                'Employee Marked Inactive',
                'success'
              );

              this.loadEmployees();

            }

          });

      }

    });

  }

}