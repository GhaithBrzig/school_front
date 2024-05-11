import {Classe} from "./Classe";
import {Enseignant} from "./Enseignant";

export class Evaluation {
  id?: number;
  nom?: string;
  question?: string;
  reponse?: string;
  classe?: Classe;
  enseignant?: Enseignant;
}
