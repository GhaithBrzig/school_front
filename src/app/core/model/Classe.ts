import { Eleve } from './Eleve';

export class Classe {
  id?: number;
  niveau?: string;
  nom?: string;
  nbrEleves?: number;
  eleves?: Eleve[];
  enseignants?: any[]; // Replace with the actual Enseignant interface if needed

}
