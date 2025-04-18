/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { environment } from 'src/environment.prod';
import { ApplicationRequest } from '../../models/application-request';
import { ApplicationResponse } from '../../models/application-response';

export interface AddNewApplication$Params {
      body: ApplicationRequest
}

export function addNewApplication(http: HttpClient, rootUrl: string, params: AddNewApplication$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse>> {
  const rb = new RequestBuilder(environment.apiUrl, addNewApplication.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

addNewApplication.PATH = '/api/v1/application/addNewApplication';
