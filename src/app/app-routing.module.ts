import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { estaAutenticadoGuard } from './auth/guards/estaAutenticado.guard';

const routes: Routes = [

  {
    path: 'auth',
    // guards
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [estaAutenticadoGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path : '**',
    redirectTo: 'auth/login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
