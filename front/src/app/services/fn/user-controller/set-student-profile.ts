/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface SetStudentProfile$Params {
  id_user: number;
  birthdate: string;
  level: 'LICENCE' | 'MASTER' | 'ENGINEER';
  classe: 'FIRST_YEAR' | 'SECOND_YEAR' | 'THIRD_YEAR' | 'FOURTH_YEAR' | 'FIFTH_YEAR';
  speciality: 'ARCTIC' | 'BI' | 'GAMING' | 'DS' | 'TWIN';
      body?: {
'studentCV': Blob;
}
}

export function setStudentProfile(http: HttpClient, rootUrl: string, params: SetStudentProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, setStudentProfile.PATH, 'put');
  if (params) {
    rb.path('id_user', params.id_user, {});
    rb.query('birthdate', params.birthdate, {});
    rb.query('level', params.level, {});
    rb.query('classe', params.classe, {});
    rb.query('speciality', params.speciality, {});
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

setStudentProfile.PATH = '/api/v1/user/student/{id_user}';
