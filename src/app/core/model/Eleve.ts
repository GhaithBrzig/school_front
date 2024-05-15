
import {User} from "./User";
import {Classe} from "./Classe";
import {Parent} from "./Parent";
import {Evaluation} from "./Evaluation";

export class Eleve extends User{
  classe?: Classe;
  parents?: Parent[];
  evaluations?: Evaluation[];
  classeId?: number;
  classeName?: string;


  passedEvaluations?: Evaluation[];
}
