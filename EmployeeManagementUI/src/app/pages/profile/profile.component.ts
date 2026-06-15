import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile() {

    this.employeeService
      .getMyProfile()
      .subscribe({

        next: (res) => {

          this.profile = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}