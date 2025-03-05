/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface GetAllInternshipByStatus$Params {
  status: 'OPEN' | 'CLOSE';
}

export function getAllInternshipByStatus(http: HttpClient, rootUrl: string, params: GetAllInternshipByStatus$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllInternshipByStatus.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {});
  }
  rb.header('Authorization', `Bearer ${token}`);

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<InternshipResponse>>;
    })
  );
}

getAllInternshipByStatus.PATH = '/api/v1/internship/internship-status';
