import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../../../shared/interfaces/producto-response.interfaces';
import { ProductoService } from '../../services/Producto.service';
import { Errors, ListResponse } from '../../../shared/interfaces';
import { Pageable } from '../../../shared/interfaces/pageable-response.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-producto',
  templateUrl: 'list-producto.component.html'
})

export class ListProductoComponent implements OnInit {

  public listaProductos : Producto[] = [];

  public pageable : Pageable ={number:0, size:10};

  private service = inject(ProductoService);

  constructor() { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.service.getListProductos().subscribe(
      (response: ListResponse<Producto>) => {
        this.listaProductos = response._embedded.data;
        this.pageable = response.pageable;
        console.log(this.listaProductos);
      },
      (errorResponse) => {

        if (errorResponse.error && typeof errorResponse.error === 'object') {
          let mensajeErrorSweet : string = "<p>";
          const errors: Errors = errorResponse.error;
          errors.errors.forEach(element => {
              console.log(element.description);
              mensajeErrorSweet += `${element.description} <br>`;
            });
            mensajeErrorSweet += "</p>";
            Swal.fire({html:mensajeErrorSweet, icon: 'error',confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'});
        }else{
          Swal.fire({html:'Error no controlado al obtener la data', icon: 'error',confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'});
        }

      }
    );
  }

  delete (idProducto:number) : void {

    Swal.fire({
      html: "&iquest;Est&aacute; seguro que desea eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d1b5c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () =>  {
          this.service.delete(idProducto).subscribe (
            {
              next: () => {
                Swal.fire({html:"Producto Eliminado Existosamente!!!",icon:"success",confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'}).then((result) => {
                  this.getData();
                });
              },
              error : (listError : Errors) => {

                let mensajeErrorSweet : string = "<p>";

                listError.errors.forEach(element => {
                  mensajeErrorSweet += `${element.description} <br>`;
                });
                mensajeErrorSweet += "</p>";
                Swal.fire({html:mensajeErrorSweet, icon: 'error',confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'});
              }

            }
          );
      }
    }).then((result) => {

      if (result.dismiss != null && result.dismiss != undefined){
        Swal.fire({html: "La operaci&oacute;n fue cancelada", icon: 'error',confirmButtonText: 'Aceptar',confirmButtonColor: '#0d1b5c'});
      }

    });

  }

}
