import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { DepartmentService } from '../../core/services/department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

  departments: any[] = [];

  showForm = false;

  isEditMode = false;

  currentPage = 1;

  pageSize = 5;

  department = {
    departmentId: 0,
    departmentName: '',
    description: '',
    status: true
  };

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {

    this.loadDepartments();

  }

  // ======================
  // Pagination
  // ======================

  get pagedDepartments() {

    const start =
      (this.currentPage - 1) *
      this.pageSize;

    return this.departments.slice(
      start,
      start + this.pageSize
    );

  }

  get totalPages() {

    return Math.ceil(
      this.departments.length /
      this.pageSize
    ) || 1;

  }

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

    }

  }

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }

  // ======================
  // Load
  // ======================

 loadDepartments(): void {

  this.departmentService
    .getAllDepartments()
    .subscribe({

      next: (res) => {

        this.departments = res.map((x: any) => ({

          departmentId: x.departmentId,

          departmentName: x.departmentName,

          description: x.description,

          status:
            x.status === true ||
            x.status === 1 ||
            x.status === '1'

        }));

        this.currentPage = 1;

        console.log('Departments =>', this.departments);

      },

      error: (err) => {

        console.log(err);

      }

    });

}

  // ======================
  // Form
  // ======================

  openForm(): void {

    this.showForm = true;

    this.isEditMode = false;

    this.resetDepartment();

  }

  closeForm(): void {

    this.showForm = false;

    this.isEditMode = false;

    this.resetDepartment();

  }

  resetDepartment(): void {

    this.department = {
      departmentId: 0,
      departmentName: '',
      description: '',
      status: true
    };

  }

  // ======================
  // Save / Update
  // ======================

  saveDepartment(): void {

    if (!this.department.departmentName.trim()) {

      Swal.fire(
        'Validation',
        'Department Name is required',
        'warning'
      );

      return;

    }

    if (
      this.department.departmentName
        .trim()
        .length < 3
    ) {

      Swal.fire(
        'Validation',
        'Department Name must be minimum 3 characters',
        'warning'
      );

      return;

    }

    if (!this.department.description.trim()) {

      Swal.fire(
        'Validation',
        'Description is required',
        'warning'
      );

      return;

    }

    // ADD
    if (!this.isEditMode) {

      this.department.status = true;

      this.departmentService
        .addDepartment(this.department)
        .subscribe({

          next: (res) => {

            Swal.fire(
              'Success',
              res.message ||
              'Department Added Successfully',
              'success'
            );

            this.loadDepartments();

            this.closeForm();

          },

          error: (err) => {

            console.log(err);

            Swal.fire(
              'Error',
              'Unable To Save Department',
              'error'
            );

          }

        });

      return;

    }

    // UPDATE

    this.departmentService
      .updateDepartment(this.department)
      .subscribe({

        next: (res) => {

          Swal.fire(
            'Success',
            res.message ||
            'Department Updated Successfully',
            'success'
          );

          this.loadDepartments();

          this.closeForm();

        },

        error: (err) => {

          console.log(err);

          Swal.fire(
            'Error',
            'Unable To Update Department',
            'error'
          );

        }

      });

  }

  // ======================
  // Edit
  // ======================

  editDepartment(dept: any): void {

    this.showForm = true;

    this.isEditMode = true;

    this.department = {
  departmentId: dept.departmentId,
  departmentName: dept.departmentName,
  description: dept.description,
  status: Boolean(dept.status)
};
  }

  // ======================
  // Delete
  // ======================

  deleteDepartment(
    id: number
  ): void {

    const dept =
      this.departments.find(
        x =>
          x.departmentId === id
      );

    if (
      dept &&
      !dept.status
    ) {

      Swal.fire(
        'Info',
        'Department Already Deleted',
        'info'
      );

      return;

    }

    Swal.fire({

      title: 'Are You Sure?',

      text:
        'Department will be marked inactive',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText:
        'Yes'

    })
    .then((result) => {

      if (result.isConfirmed) {

        this.departmentService
          .deleteDepartment(id)
          .subscribe({

            next: (res) => {

              Swal.fire(
                'Success',
                res.message ||
                'Department Marked Inactive',
                'success'
              );

              this.loadDepartments();

            },

            error: (err) => {

              console.log(err);

              Swal.fire(
                'Error',
                'Unable To Delete Department',
                'error'
              );

            }

          });

      }

    });

  }

}