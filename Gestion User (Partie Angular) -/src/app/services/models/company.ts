/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Company {
  address?: string;
  companyEmail?: string;
  companyId?: number;
  companyName?: string;
  companyPrintCode?: number;
  companyStatus?: 'PENDING' | 'ACCEPTED' | 'REFUSED';
  companyTelephone?: number;
  domaine?: 'TELECOM' | 'NETWORK' | 'DEVELOPMENT' | 'CLOUD' | 'ENERGY' | 'BIOLOGY';
  supervisor?: User;
  webSite?: string;
  company_logo?: Array<string>;

}
