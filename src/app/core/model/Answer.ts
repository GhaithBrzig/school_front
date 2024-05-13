import {Question} from "./Question";


export class Answer {
  id?: number;
  text?: string;
  correct?: boolean;
  question?: Question;
}
