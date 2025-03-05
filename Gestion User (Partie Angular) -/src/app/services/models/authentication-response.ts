/* tslint:disable */
/* eslint-disable */
export interface AuthenticationResponse {
  token?: string;
  userID?: number;
  userRole?: 'SUPERVISOR' | 'STUDENT' | 'ADMIN';
}
