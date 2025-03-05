import { Etudiant } from './etudiant'; // Assure-toi que le chemin est correct

  export interface Supervisor {
    id?: number;
    name: string;
    email: string;
    etudiants?: Etudiant[];  // On peut directement utiliser l'interface Etudiant
  }
