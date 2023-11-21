import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from './layout/dashboardLayout/dashboardLayout.component';
import { ListProductoComponent } from './pages/productos/listProducto.component';
import { RegisterProductoComponent } from './pages/productos/registerProducto.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ListProductoComponent,
    RegisterProductoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
