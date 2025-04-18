/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Company } from '../../models/company';

export interface GetCompanyById$Params {
  id_company: number;
}

export function getCompanyById(http: HttpClient, rootUrl: string, params: GetCompanyById$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<Company>> {
  const rb = new RequestBuilder(rootUrl, getCompanyById.PATH, 'get');
  if (params) {
    rb.path('id_company', params.id_company, {});
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

getCompanyById.PATH = '/api/v1/company/{id_company}';
