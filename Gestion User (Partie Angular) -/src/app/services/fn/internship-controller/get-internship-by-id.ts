/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface GetInternshipById$Params {
  id_internship: number;
}

export function getInternshipById(http: HttpClient, rootUrl: string, params: GetInternshipById$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
  const rb = new RequestBuilder(rootUrl, getInternshipById.PATH, 'get');
  if (params) {
    rb.path('id_internship', params.id_internship, {});
  }
  rb.header('Authorization', `Bearer ${token}`);
  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InternshipResponse>;
    })
  );
}

getInternshipById.PATH = '/api/v1/internship/{id_internship}';
