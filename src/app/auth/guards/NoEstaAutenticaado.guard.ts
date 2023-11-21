import { Router, type CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

/*export const noEstaAutenticadoGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.usuarioValido()){
    router.navigateByUrl('/dashboard');
      return false;
  }
    return true;
};*/
