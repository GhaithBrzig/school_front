import {User} from "./User";
import {Eleve} from "./Eleve";

export class Parent extends User {
  enfants?: Eleve[];
}
