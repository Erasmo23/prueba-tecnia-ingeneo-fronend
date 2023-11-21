export interface Errors {
  errors: Error[];
}

export interface Error {
  statusCode:    number;
  type:          string;
  source:        string;
  message:       string;
  description:   string;
  localDateTime: string;
}
