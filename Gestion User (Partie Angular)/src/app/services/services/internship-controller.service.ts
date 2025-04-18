/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment.prod';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createNewInternship } from '../fn/internship-controller/create-new-internship';
import { CreateNewInternship$Params } from '../fn/internship-controller/create-new-internship';
import { deleteInternship } from '../fn/internship-controller/delete-internship';
import { DeleteInternship$Params } from '../fn/internship-controller/delete-internship';
import { getAllInternship } from '../fn/internship-controller/get-all-internship';
import { GetAllInternship$Params } from '../fn/internship-controller/get-all-internship';
import { getAllInternshipAfternDate } from '../fn/internship-controller/get-all-internship-aftern-date';
import { GetAllInternshipAfternDate$Params } from '../fn/internship-controller/get-all-internship-aftern-date';
import { getAllInternshipByCompany } from '../fn/internship-controller/get-all-internship-by-company';
import { GetAllInternshipByCompany$Params } from '../fn/internship-controller/get-all-internship-by-company';
import { getAllInternshipByStatus } from '../fn/internship-controller/get-all-internship-by-status';
import { GetAllInternshipByStatus$Params } from '../fn/internship-controller/get-all-internship-by-status';
import { getAllInternshipByType } from '../fn/internship-controller/get-all-internship-by-type';
import { GetAllInternshipByType$Params } from '../fn/internship-controller/get-all-internship-by-type';
import { getAllintershipBySupervisor } from '../fn/internship-controller/get-allintership-by-supervisor';
import { GetAllintershipBySupervisor$Params } from '../fn/internship-controller/get-allintership-by-supervisor';
import { getInternshipById } from '../fn/internship-controller/get-internship-by-id';
import { GetInternshipById$Params } from '../fn/internship-controller/get-internship-by-id';
import { InternshipResponse } from '../models/internship-response';
import { setInternship } from '../fn/internship-controller/set-internship';
import { SetInternship$Params } from '../fn/internship-controller/set-internship';

@Injectable({ providedIn: 'root' })
export class InternshipControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setInternship()` */
  static readonly SetInternshipPath = '/api/v1/internship/set-internship/{id_internship}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setInternship()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setInternship$Response(params: SetInternship$Params, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
    return setInternship(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setInternship$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setInternship(params: SetInternship$Params, context?: HttpContext): Observable<InternshipResponse> {
    return this.setInternship$Response(params, context).pipe(
      map((r: StrictHttpResponse<InternshipResponse>): InternshipResponse => r.body)
    );
  }

  /** Path part for operation `createNewInternship()` */
  static readonly CreateNewInternshipPath = '/api/v1/internship/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewInternship()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewInternship$Response(params: CreateNewInternship$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
    return createNewInternship(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNewInternship$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewInternship(params: CreateNewInternship$Params,token:string, context?: HttpContext): Observable<InternshipResponse> {
    return this.createNewInternship$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<InternshipResponse>): InternshipResponse => r.body)
    );
  }

  /** Path part for operation `getAllInternship()` */
  static readonly GetAllInternshipPath = '/api/v1/internship';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInternship()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternship$Response(params?: GetAllInternship$Params,token?:string ,context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
    return getAllInternship(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInternship$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternship(params?: GetAllInternship$Params,token?:string, context?: HttpContext): Observable<Array<InternshipResponse>> {
    return this.getAllInternship$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<Array<InternshipResponse>>): Array<InternshipResponse> => r.body)
    );
  }

  /** Path part for operation `getInternshipById()` */
  static readonly GetInternshipByIdPath = '/api/v1/internship/{id_internship}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInternshipById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInternshipById$Response(params: GetInternshipById$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
    return getInternshipById(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInternshipById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInternshipById(params: GetInternshipById$Params,token:string, context?: HttpContext): Observable<InternshipResponse> {
    return this.getInternshipById$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<InternshipResponse>): InternshipResponse => r.body)
    );
  }

  /** Path part for operation `deleteInternship()` */
  static readonly DeleteInternshipPath = '/api/v1/internship/{id_internship}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteInternship()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInternship$Response(params: DeleteInternship$Params, context?: HttpContext): Observable<StrictHttpResponse<InternshipResponse>> {
    return deleteInternship(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteInternship$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInternship(params: DeleteInternship$Params, context?: HttpContext): Observable<InternshipResponse> {
    return this.deleteInternship$Response(params, context).pipe(
      map((r: StrictHttpResponse<InternshipResponse>): InternshipResponse => r.body)
    );
  }

  /** Path part for operation `getAllintershipBySupervisor()` */
  static readonly GetAllintershipBySupervisorPath = '/api/v1/internship/supervisor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllintershipBySupervisor()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllintershipBySupervisor$Response(params: GetAllintershipBySupervisor$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
    return getAllintershipBySupervisor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllintershipBySupervisor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllintershipBySupervisor(params: GetAllintershipBySupervisor$Params, context?: HttpContext): Observable<Array<InternshipResponse>> {
    return this.getAllintershipBySupervisor$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InternshipResponse>>): Array<InternshipResponse> => r.body)
    );
  }

  /** Path part for operation `getAllInternshipByType()` */
  static readonly GetAllInternshipByTypePath = '/api/v1/internship/internship-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInternshipByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipByType$Response(params: GetAllInternshipByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
    return getAllInternshipByType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInternshipByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipByType(params: GetAllInternshipByType$Params, context?: HttpContext): Observable<Array<InternshipResponse>> {
    return this.getAllInternshipByType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InternshipResponse>>): Array<InternshipResponse> => r.body)
    );
  }

  /** Path part for operation `getAllInternshipByStatus()` */
  static readonly GetAllInternshipByStatusPath = '/api/v1/internship/internship-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInternshipByStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipByStatus$Response(params: GetAllInternshipByStatus$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
    return getAllInternshipByStatus(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInternshipByStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipByStatus(params: GetAllInternshipByStatus$Params,token:string, context?: HttpContext): Observable<Array<InternshipResponse>> {
    return this.getAllInternshipByStatus$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<Array<InternshipResponse>>): Array<InternshipResponse> => r.body)
    );
  }

  /** Path part for operation `getAllInternshipAfternDate()` */
  static readonly GetAllInternshipAfternDatePath = '/api/v1/internship/date-after';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInternshipAfternDate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipAfternDate$Response(params: GetAllInternshipAfternDate$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InternshipResponse>>> {
    return getAllInternshipAfternDate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInternshipAfternDate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipAfternDate(params: GetAllInternshipAfternDate$Params, context?: HttpContext): Observable<Array<InternshipResponse>> {
    return this.getAllInternshipAfternDate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InternshipResponse>>): Array<InternshipResponse> => r.body)
    );
  }

  /** Path part for operation `getAllInternshipByCompany()` */
  static readonly GetAllInternshipByCompanyPath = '/api/v1/internship/company/{id_company}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInternshipByCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipByCompany$Response(params: GetAllInternshipByCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllInternshipByCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInternshipByCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInternshipByCompany(params: GetAllInternshipByCompany$Params, context?: HttpContext): Observable<void> {
    return this.getAllInternshipByCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
