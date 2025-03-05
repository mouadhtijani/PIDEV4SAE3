/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  birthdate?: string;
  classeLevel?: 'FIRST_YEAR' | 'SECOND_YEAR' | 'THIRD_YEAR' | 'FOURTH_YEAR' | 'FIFTH_YEAR';
  creationDate?: string;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  lastModifiedDate?: string;
  lastName?: string;
  name?: string;
  password?: string;
  role?: 'SUPERVISOR' | 'STUDENT' | 'ADMIN';
  specialty?: 'ARCTIC' | 'BI' | 'GAMING' | 'DS' | 'TWIN';
  studentCV?: Array<string>;
  studentLevel?: 'LICENCE' | 'MASTER' | 'ENGINEER';
  userId?: number;
  userImage?: Array<string>;
  username?: string;
}
