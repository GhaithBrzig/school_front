import {User} from "./User";
import {Eleve} from "./Eleve";
import {Classe} from "./Classe";
import {Evaluation} from "./Evaluation";

export class Enseignant extends User {
  matiere?: Matiere;
  eleves?: Eleve[];
  classes?: Classe[];
  evaluations?: Evaluation[];
}


export enum Matiere {
  MATH = 'MATH',
  PHYSICS = 'PHYSICS',
  CHEMISTRY = 'CHEMISTRY',
  BIOLOGY = 'BIOLOGY',
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
  HISTORY = 'HISTORY',
  GEOGRAPHY = 'GEOGRAPHY'
}