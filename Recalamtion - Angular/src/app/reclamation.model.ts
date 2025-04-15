// src/app/reclamation.model.ts
export interface Reclamation {
  id?: number; // Make 'id' optional
  typeUser: string;
  nomUser: string;
  objet: string;
  description: string;
  dateCreation?: string;  // Optional field for creation date
  response?: {
    message: string;
    responseDate: string;
  };
}
