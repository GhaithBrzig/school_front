import { Classe } from "./Classe";
import { Enseignant } from "./Enseignant";
import { EvaluationResult } from "./EvaluationResult";
import { Question } from "./Question";

export class Evaluation {
  id?: number;
  nom?: string;
  questions?: Question[];
  classe?: Classe;
  enseignant?: Enseignant;
  evaluationResults?: EvaluationResult[];
  deadline?: Date; // Updated to include deadline
  duration?: DurationEnum; // Updated to include duration
}

export enum DurationEnum {
  MINUTES_15 = 'MINUTES_15',
  MINUTES_30 = 'MINUTES_30',
  MINUTES_45 = 'MINUTES_45',
  MINUTES_60 = 'MINUTES_60'
}
