/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Company } from '../../models/company';
import { CompanyRequest } from '../../models/company-request';

export interface AddCompany$Params {
      body: CompanyRequest
}

export function addCompany(http: HttpClient, rootUrl: string, params: AddCompany$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<Company>> {
  const rb = new RequestBuilder(rootUrl, addCompany.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

addCompany.PATH = '/api/v1/company/Create';
