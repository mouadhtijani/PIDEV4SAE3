/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface GetAllInternshipByType$Params {
  type: 'FULL_TIME' | 'PART_TIME' | 'ONSITE' | 'REMOTE';
}

export function getAllInternshipByType(http: HttpClient, rootUrl: string, params: GetAllInternshipByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllInternshipByType.PATH, 'get');
  if (params) {
    rb.query('type', params.type, {});
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

getAllInternshipByType.PATH = '/api/v1/internship/internship-type';
