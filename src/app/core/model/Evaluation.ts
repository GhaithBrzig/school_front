import {Classe} from "./Classe";
import {Enseignant} from "./Enseignant";
import {EvaluationResult} from "./EvaluationResult";
import {Question} from "./Question";


export class Evaluation {
  id?: number;
  nom?: string;
  questions?: Question[];
  classe?: Classe;
  enseignant?: Enseignant;
  evaluationResults?: EvaluationResult[];
}
