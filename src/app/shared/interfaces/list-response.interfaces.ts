import { Links } from "./links.interfaces";
import { Pageable } from "./pageable-response.interfaces";

export interface ListResponse<T> {
  _embedded: Embedded<T>;
  _links:    Links;
  pageable:      Pageable;
}

export interface Embedded<T> {
  data: T[];
}
