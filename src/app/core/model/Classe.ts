import { Eleve } from './Eleve';
import { Enseignant } from './enseignant.model';

export class Classe {
  id?: number;
  niveau?: string;
  nom?: string;
  nbrEleves?: number;
  eleves?: Eleve[];
  enseignants?: Enseignant[];
}
