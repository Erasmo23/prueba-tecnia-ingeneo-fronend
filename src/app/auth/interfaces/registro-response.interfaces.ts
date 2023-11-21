import { Links } from "../../shared/interfaces/links.interfaces";

export interface User {
  usuarioId:     number;
  nombres:       string;
  apellidos:     string;
  correo:        string;
  activo:        boolean;
  tokenActivate: string;
  _links:        Links;
}


