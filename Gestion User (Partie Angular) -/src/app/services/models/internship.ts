import { Company } from "./company";
import { User } from "./user";

export interface Internship {
    intershipId: number;
    postName: string;
    postDescription: string;
    postCapacity: number;
    startDate: Date;
    endDate: Date;
    internshipType: string;
    internshipStatus: string;
    creationDate: Date;
    supervisor: User; // Adjust according to your User model
    company: Company; // Adjust according to your Company model
  }
  