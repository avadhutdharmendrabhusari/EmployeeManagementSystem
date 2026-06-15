import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  role: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.role =
      localStorage.getItem('role') || '';

    console.log('ROLE =>', this.role);

  }

  logout(): void {

  Swal.fire({

    title: 'Logout?',

    text: 'Do you want to logout?',

    icon: 'question',

    showCancelButton: true,

    confirmButtonText: 'Yes Logout',

    cancelButtonText: 'Cancel'

  }).then((result) => {

    if (result.isConfirmed) {

      localStorage.clear();

      this.router.navigate(['/login']);

      Swal.fire(
        'Logged Out',
        'Logout Successfully',
        'success'
      );

    }

  });

  }

}