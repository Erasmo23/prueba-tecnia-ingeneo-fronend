import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserRequest } from '../../interfaces';
import { Errors } from '../../../shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  private formBuilder = inject( FormBuilder);
  private authService = inject( AuthService);
  private router = inject (Router);

  public myForm: FormGroup = this.formBuilder.group ({
    nombres: ['',[Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    apellidos: ['',[Validators.maxLength(100)]],
    correo : ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]

  });

  public registro () : void {
    const userRegitro : UserRequest = this.myForm.value;
    this.authService.registro(userRegitro)
      .subscribe (
        {
          next: () => {
            Swal.fire({html:"Registro completado, ya puede iniciar sesión.",icon:"success",confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'}).then((result) => {
							this.router.navigateByUrl("/auth/login");
						});
          },
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
