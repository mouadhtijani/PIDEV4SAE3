/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface Register$Params {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'SUPERVISOR' | 'STUDENT' | 'ADMIN';
      body?: {
'userImage': Blob;
}
}

export function register(http: HttpClient, rootUrl: string, params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, register.PATH, 'post');
  if (params) {
    rb.query('firstName', params.firstName, {});
    rb.query('lastName', params.lastName, {});
    rb.query('email', params.email, {});
    rb.query('password', params.password, {});
    rb.query('role', params.role, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

register.PATH = '/api/v1/auth/register';
