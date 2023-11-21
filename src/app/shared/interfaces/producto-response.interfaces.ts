import { Links } from "./links.interfaces";

export interface Producto {
  productoId:  number;
  nombre:      string;
  descripcion: string;
  peso:        number;
  _links:      Links;
}
