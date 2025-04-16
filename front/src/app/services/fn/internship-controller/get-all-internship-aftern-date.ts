/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface GetAllInternshipAfternDate$Params {
  'start-date': string;
}

export function getAllInternshipAfternDate(http: HttpClient, rootUrl: string, params: GetAllInternshipAfternDate$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllInternshipAfternDate.PATH, 'get');
  if (params) {
    rb.query('start-date', params['start-date'], {});
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

getAllInternshipAfternDate.PATH = '/api/v1/internship/date-after';
