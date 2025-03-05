/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetAllCompanyByDomaine$Params {
  domaine: 'TELECOM' | 'NETWORK' | 'DEVELOPMENT' | 'CLOUD' | 'ENERGY' | 'BIOLOGY';
}

export function getAllCompanyByDomaine(http: HttpClient, rootUrl: string, params: GetAllCompanyByDomaine$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, getAllCompanyByDomaine.PATH, 'get');
  if (params) {
    rb.query('domaine', params.domaine, {});
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

getAllCompanyByDomaine.PATH = '/api/v1/company/domaine';
