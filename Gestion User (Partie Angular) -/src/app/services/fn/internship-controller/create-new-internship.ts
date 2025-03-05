/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { environment } from 'src/environment.prod';
import { InternshipRequest } from '../../models/internship-request';
import { InternshipResponse } from '../../models/internship-response';

export interface CreateNewInternship$Params {
      body: InternshipRequest
}

export function createNewInternship(http: HttpClient, rootUrl: string, params: CreateNewInternship$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
  const rb = new RequestBuilder(environment.apiUrl, createNewInternship.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createNewInternship.PATH = '/api/v1/internship/create';
