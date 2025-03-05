/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface ApplicationResponse {
  applicationDate?: string;
  applicationId?: number;
  applicationStatus?: 'PENDING' | 'ACCEPTED' | 'REFUSED';
  internshipId?: number;
  student?: User;
}
