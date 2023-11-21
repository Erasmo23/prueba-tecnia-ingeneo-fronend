import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboardLayout/dashboardLayout.component';
import { RegisterProductoComponent } from './pages/productos/registerProducto.component';
import { ListProductoComponent } from './pages/productos/listProducto.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardLayoutComponent,
    children: [
      { path : 'addProducto', component: RegisterProductoComponent },
      { path : 'productos', component: ListProductoComponent },
      { path : '**', redirectTo:'dashboard'}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
