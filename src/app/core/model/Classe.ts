import { Eleve } from "./Eleve";

export interface Classe {
  id?: number;
  niveau: string;
  nom: string;
  nbrEleves: number;
  eleves: Eleve[];
}
