/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addNewApplication } from '../fn/application-controller/add-new-application';
import { AddNewApplication$Params } from '../fn/application-controller/add-new-application';
import { ApplicationResponse } from '../models/application-response';
import { deleteApplication } from '../fn/application-controller/delete-application';
import { DeleteApplication$Params } from '../fn/application-controller/delete-application';
import { getApplicationByCompany } from '../fn/application-controller/get-application-by-company';
import { GetApplicationByCompany$Params } from '../fn/application-controller/get-application-by-company';
import { getApplicationByInternship } from '../fn/application-controller/get-application-by-internship';
import { GetApplicationByInternship$Params } from '../fn/application-controller/get-application-by-internship';
import { getApplicationbyStatus } from '../fn/application-controller/get-applicationby-status';
import { GetApplicationbyStatus$Params } from '../fn/application-controller/get-applicationby-status';
import { getApplicationByUser } from '../fn/application-controller/get-application-by-user';
import { GetApplicationByUser$Params } from '../fn/application-controller/get-application-by-user';
import { getOneApplication } from '../fn/application-controller/get-one-application';
import { GetOneApplication$Params } from '../fn/application-controller/get-one-application';
import { setApplicationStatus } from '../fn/application-controller/set-application-status';
import { SetApplicationStatus$Params } from '../fn/application-controller/set-application-status';

@Injectable({ providedIn: 'root' })
export class ApplicationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setApplicationStatus()` */
  static readonly SetApplicationStatusPath = '/api/v1/application/set-Status/{id_application}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setApplicationStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  setApplicationStatus$Response(params: SetApplicationStatus$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse>> {
    return setApplicationStatus(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setApplicationStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setApplicationStatus(params: SetApplicationStatus$Params,token:string, context?: HttpContext): Observable<ApplicationResponse> {
    return this.setApplicationStatus$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<ApplicationResponse>): ApplicationResponse => r.body)
    );
  }

  /** Path part for operation `addNewApplication()` */
  static readonly AddNewApplicationPath = '/api/v1/application/addNewApplication';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNewApplication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewApplication$Response(params: AddNewApplication$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse>> {
    return addNewApplication(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNewApplication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewApplication(params: AddNewApplication$Params,token:string, context?: HttpContext): Observable<ApplicationResponse> {
    return this.addNewApplication$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<ApplicationResponse>): ApplicationResponse => r.body)
    );
  }

  /** Path part for operation `getOneApplication()` */
  static readonly GetOneApplicationPath = '/api/v1/application/{id_application}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOneApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOneApplication$Response(params: GetOneApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getOneApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOneApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOneApplication(params: GetOneApplication$Params, context?: HttpContext): Observable<void> {
    return this.getOneApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getApplicationByUser()` */
  static readonly GetApplicationByUserPath = '/api/v1/application/user/{id_user}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationByUser$Response(params: GetApplicationByUser$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse[]>> {
    return getApplicationByUser(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationByUser(params: GetApplicationByUser$Params,token:string, context?: HttpContext): Observable<ApplicationResponse[]> {
    return this.getApplicationByUser$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<ApplicationResponse[]>): ApplicationResponse[] => r.body)
    );
  }

  /** Path part for operation `getApplicationbyStatus()` */
  static readonly GetApplicationbyStatusPath = '/api/v1/application/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationbyStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationbyStatus$Response(params: GetApplicationbyStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getApplicationbyStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationbyStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationbyStatus(params: GetApplicationbyStatus$Params, context?: HttpContext): Observable<void> {
    return this.getApplicationbyStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getApplicationByInternship()` */
  static readonly GetApplicationByInternshipPath = '/api/v1/application/internship/{id_internship}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationByInternship()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationByInternship$Response(params: GetApplicationByInternship$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getApplicationByInternship(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationByInternship$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationByInternship(params: GetApplicationByInternship$Params, context?: HttpContext): Observable<void> {
    return this.getApplicationByInternship$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getApplicationByCompany()` */
  static readonly GetApplicationByCompanyPath = '/api/v1/application/company/{id_company}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationByCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationByCompany$Response(params: GetApplicationByCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getApplicationByCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationByCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationByCompany(params: GetApplicationByCompany$Params, context?: HttpContext): Observable<void> {
    return this.getApplicationByCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteApplication()` */
  static readonly DeleteApplicationPath = '/api/v1/application';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplication$Response(params: DeleteApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<ApplicationResponse>> {
    return deleteApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplication(params: DeleteApplication$Params, context?: HttpContext): Observable<ApplicationResponse> {
    return this.deleteApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApplicationResponse>): ApplicationResponse => r.body)
    );
  }

}
