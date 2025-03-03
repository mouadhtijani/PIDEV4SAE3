/* tslint:disable */
/* eslint-disable */
export interface InternshipRequest {
  companyCode: number;
  companyId: number;
  endDate: string;
  internshipType: 'FULL_TIME' | 'PART_TIME' | 'ONSITE' | 'REMOTE';
  postCapacity: number;
  postDescription: string;
  postName: string;
  startDate: string;
  supervisorId: number;
}
