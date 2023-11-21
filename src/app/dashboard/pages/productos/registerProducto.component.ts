import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ProductoRequest } from '../../../shared/interfaces/producto-request.interfaces';
import { ProductoService } from '../../services/Producto.service';
import Swal from 'sweetalert2';
import { Errors } from '../../../shared/interfaces';

@Component({
  selector: 'app-add-producto',
  templateUrl: './register-producto.component.html'
})
export class RegisterProductoComponent {

  private formBuilder = inject( FormBuilder);
  private service = inject(ProductoService);
  private router = inject(Router);

  public myForm: FormGroup = this.formBuilder.group ({
    nombre: ['',[Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    descripcion: ['',[Validators.required,Validators.maxLength(100)]],
    peso : ['', [Validators.maxLength(8)] ]

  });

  registro():void {
    const productoNew : ProductoRequest = this.myForm.value;
    this.service.registro(productoNew)
      .subscribe (
        {
          next: () => {
            Swal.fire({html:"Producto Agregado Existosamente!!!",icon:"success",confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'}).then((result) => {
							this.router.navigateByUrl("/dashboard/productos");
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
