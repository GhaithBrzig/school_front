import {User} from "./User";
import {Eleve} from "./Eleve";
import {Classe} from "./Classe";
import {Evaluation} from "./Evaluation";

export class Enseignant extends User {
  matiere?: string;
  eleves?: Eleve[];
  classes?: Classe[];
  evaluations?: Evaluation[];
}
