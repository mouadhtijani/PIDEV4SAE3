/* tslint:disable */
/* eslint-disable */
export interface CompanyRequest {
  address: string;
  companyEmail: string;
  companyName: string;
  companyTelephone: number;
  domaine: 'TELECOM' | 'NETWORK' | 'DEVELOPMENT' | 'CLOUD' | 'ENERGY' | 'BIOLOGY';
  supervisorId?: number;
  webSite: string;
}
