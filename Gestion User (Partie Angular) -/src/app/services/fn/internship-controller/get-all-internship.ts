/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface GetAllInternship$Params {
}

export function getAllInternship(http: HttpClient, rootUrl: string, params?: GetAllInternship$Params,token?:string, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllInternship.PATH, 'get');
  if (params) {
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

getAllInternship.PATH = '/api/v1/internship';
