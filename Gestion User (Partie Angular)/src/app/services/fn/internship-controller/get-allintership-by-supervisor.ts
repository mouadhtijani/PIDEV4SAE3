/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface GetAllintershipBySupervisor$Params {
  id_supervisor: number;
}

export function getAllintershipBySupervisor(http: HttpClient, rootUrl: string, params: GetAllintershipBySupervisor$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllintershipBySupervisor.PATH, 'get');
  if (params) {
    rb.query('id_supervisor', params.id_supervisor, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<InternshipResponse>>;
    })
  );
}

getAllintershipBySupervisor.PATH = '/api/v1/internship/supervisor';
