import { Classe } from "./Classe";

export interface Eleve {
  eleveId?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  classe?: Classe;
}