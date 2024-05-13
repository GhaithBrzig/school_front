import {Answer} from "./Answer";
import {Evaluation} from "./Evaluation";


export class Question {
  id?: number;
  text?: string;
  answers?: Answer[];
  evaluation?: Evaluation;
}
