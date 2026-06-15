import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  let token: string | null = null;

  // Browser मध्येच localStorage access कर
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  if (token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  }

  return next(req);

};