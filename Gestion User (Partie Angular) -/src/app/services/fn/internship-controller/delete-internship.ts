/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InternshipResponse } from '../../models/internship-response';

export interface DeleteInternship$Params {
  id_internship: number;
  id_supervisor: number;
}

export function deleteInternship(http: HttpClient, rootUrl: string, params: DeleteInternship$Params, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
  const rb = new RequestBuilder(rootUrl, deleteInternship.PATH, 'delete');
  if (params) {
    rb.path('id_internship', params.id_internship, {});
    rb.query('id_supervisor', params.id_supervisor, {});
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

deleteInternship.PATH = '/api/v1/internship/{id_internship}';
