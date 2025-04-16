/* tslint:disable */
/* eslint-disable */
export interface InternshipResponse {
  companyId?: number;
  creationDate?: string;
  endDate?: string;
  internshipId?: number;
  internshipStatus?: 'OPEN' | 'CLOSE';
  internshipType?: 'FULL_TIME' | 'PART_TIME' | 'ONSITE' | 'REMOTE';
  postCapacity?: number;
  postDescription?: string;
  postName?: string;
  startDate?: string;
  supervisorId?: number;
}
