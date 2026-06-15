import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const employeeGuard: CanActivateFn = () => {

  const router = inject(Router);

  const role =
    localStorage.getItem('role');

  if (role === 'Employee') {

    return true;

  }

  router.navigate(['/dashboard']);

  return false;

};