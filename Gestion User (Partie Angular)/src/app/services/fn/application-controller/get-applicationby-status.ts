/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetApplicationbyStatus$Params {
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
}

export function getApplicationbyStatus(http: HttpClient, rootUrl: string, params: GetApplicationbyStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, getApplicationbyStatus.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

getApplicationbyStatus.PATH = '/api/v1/application/status';
