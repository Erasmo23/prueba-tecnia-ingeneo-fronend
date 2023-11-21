import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent implements OnInit {

  public username : string = 'user';

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.username = this.authService.getCorreoUser();
  }

  logout () : void {
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }


 }
