/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipRequest } from '../../models/internship-request';
import { InternshipResponse } from '../../models/internship-response';

export interface SetInternship$Params {
  id_internship: number;
      body: InternshipRequest
}

export function setInternship(http: HttpClient, rootUrl: string, params: SetInternship$Params, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
  const rb = new RequestBuilder(rootUrl, setInternship.PATH, 'put');
  if (params) {
    rb.path('id_internship', params.id_internship, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InternshipResponse>;
    })
  );
}

setInternship.PATH = '/api/v1/internship/set-internship/{id_internship}';
