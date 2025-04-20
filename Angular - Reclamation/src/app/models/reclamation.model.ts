// src/app/models/reclamation.model.ts
export interface Reclamation {
    id?: number;
    title: string;
    description: string;
    userId: string;
    userType: 'STUDENT' | 'COMPANY';
    status?: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
    adminResponse?: string;
    createdAt?: Date;
  }
  