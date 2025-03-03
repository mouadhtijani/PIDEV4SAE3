/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { ApplicationResponse } from '../../models';
import { environment } from 'src/environment.prod';

export interface GetApplicationByUser$Params {
  id_user: number;
}

export function getApplicationByUser(http: HttpClient, rootUrl: string, params: GetApplicationByUser$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse[]>> {
  const rb = new RequestBuilder(environment.apiUrl, getApplicationByUser.PATH, 'get');
  if (params) {
    rb.path('id_user', params.id_user, {});
  }
  rb.header('Authorization', `Bearer ${token}`);
  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: r.body as ApplicationResponse }) as StrictHttpResponse<ApplicationResponse[]>;
    })
  );
}

getApplicationByUser.PATH = '/api/v1/application/user/{id_user}';
