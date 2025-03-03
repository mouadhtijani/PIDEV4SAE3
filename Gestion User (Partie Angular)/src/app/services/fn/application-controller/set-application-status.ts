/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { environment } from 'src/environment.prod';
import { ApplicationResponse } from '../../models/application-response';

export interface SetApplicationStatus$Params {
  id_application: number;
  newStatus: 'PENDING' | 'ACCEPTED' | 'REFUSED';
}

export function setApplicationStatus(http: HttpClient, rootUrl: string, params: SetApplicationStatus$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse>> {
  const rb = new RequestBuilder(environment.apiUrl, setApplicationStatus.PATH, 'put');
  if (params) {
    rb.path('id_application', params.id_application, {});
    rb.query('newStatus', params.newStatus, {});
  }
  rb.header('Authorization', `Bearer ${token}`);

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApplicationResponse>;
    })
  );
}

setApplicationStatus.PATH = '/api/v1/application/set-Status/{id_application}';
