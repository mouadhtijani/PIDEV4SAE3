/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { environment } from 'src/environment.prod';
import { Company } from '../../models/company';

export interface SetCompanyStatus$Params {
  id_company: number;
  newStatus: 'PENDING' | 'ACCEPTED' | 'REFUSED';
}

export function setCompanyStatus(http: HttpClient, rootUrl: string, params: SetCompanyStatus$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<Company>> {
  const rb = new RequestBuilder(environment.apiUrl, setCompanyStatus.PATH, 'put');
  if (params) {
    rb.path('id_company', params.id_company, {});
    rb.query('newStatus', params.newStatus, {});
  }
  rb.header('Authorization', `Bearer ${token}`);

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Company>;
    })
  );
}

setCompanyStatus.PATH = '/api/v1/company/set-status/{id_company}';
