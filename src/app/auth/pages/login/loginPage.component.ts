import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Errors } from '../../../shared/interfaces';


@Component({
  selector: 'app-login-page',
  templateUrl : './login-page.component.html'
})
export class LoginPageComponent {

  private formBuilder = inject( FormBuilder);
  private authService = inject( AuthService);
  private router = inject (Router);


  public myForm: FormGroup = this.formBuilder.group ({
    correo : ['josue.menendez23@gmail.com', [Validators.required, Validators.email] ],
    password: ['admin12345', [Validators.required, Validators.minLength(8)]]
  });


  public login () : void {
    const {correo, password} = this.myForm.value;

    this.authService.login(correo, password)
      .subscribe (
        {
          next: () => this.router.navigateByUrl("/dashboard"),
          error : (listError : Errors) => {

            let mensajeErrorSweet : string = "<p>";

            listError.errors.forEach(element => {
              console.log(element.description);
              mensajeErrorSweet += `${element.description} <br>`;
            });
            mensajeErrorSweet += "</p>";
            Swal.fire({html:mensajeErrorSweet, icon: 'error',confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'});
          }

        }
      );

  }

}
