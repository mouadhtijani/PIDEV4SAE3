/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCompany } from '../fn/company-controller/add-company';
import { AddCompany$Params } from '../fn/company-controller/add-company';
import { Company } from '../models/company';
import { getAllCompany } from '../fn/company-controller/get-all-company';
import { GetAllCompany$Params } from '../fn/company-controller/get-all-company';
import { getAllCompanyByDomaine } from '../fn/company-controller/get-all-company-by-domaine';
import { GetAllCompanyByDomaine$Params } from '../fn/company-controller/get-all-company-by-domaine';
import { getAllCompanyByStatus } from '../fn/company-controller/get-all-company-by-status';
import { GetAllCompanyByStatus$Params } from '../fn/company-controller/get-all-company-by-status';
import { getCompanyById } from '../fn/company-controller/get-company-by-id';
import { GetCompanyById$Params } from '../fn/company-controller/get-company-by-id';
import { setCompany } from '../fn/company-controller/set-company';
import { SetCompany$Params } from '../fn/company-controller/set-company';
import { setCompanyStatus } from '../fn/company-controller/set-company-status';
import { SetCompanyStatus$Params } from '../fn/company-controller/set-company-status';

@Injectable({ providedIn: 'root' })
export class CompanyControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setCompanyStatus()` */
  static readonly SetCompanyStatusPath = '/api/v1/company/set-status/{id_company}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setCompanyStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  setCompanyStatus$Response(params: SetCompanyStatus$Params,token:string ,context?: HttpContext): Observable<StrictHttpResponse<Company>> {
    return setCompanyStatus(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setCompanyStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setCompanyStatus(params: SetCompanyStatus$Params,token:string, context?: HttpContext): Observable<Company> {
    return this.setCompanyStatus$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<Company>): Company => r.body)
    );
  }

  /** Path part for operation `setCompany()` */
  static readonly SetCompanyPath = '/api/v1/company/set-company/{id_company}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setCompany()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setCompany$Response(params: SetCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<Company>> {
    return setCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setCompany$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setCompany(params: SetCompany$Params, context?: HttpContext): Observable<Company> {
    return this.setCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<Company>): Company => r.body)
    );
  }

  /** Path part for operation `addCompany()` */
  static readonly AddCompanyPath = '/api/v1/company/Create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCompany()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCompany$Response(params: AddCompany$Params,token:string, context?: HttpContext): Observable<StrictHttpResponse<Company>> {
    return addCompany(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCompany$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCompany(params: AddCompany$Params,token:string, context?: HttpContext): Observable<Company> {
    return this.addCompany$Response(params,token, context).pipe(
      map((r: StrictHttpResponse<Company>): Company => r.body)
    );
  }

  /** Path part for operation `getAllCompany()` */
  static readonly GetAllCompanyPath = '/api/v1/company';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompany$Response(params?: GetAllCompany$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllCompany(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompany(params?: GetAllCompany$Params, context?: HttpContext): Observable<void> {
    return this.getAllCompany$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getCompanyById()` */
  static readonly GetCompanyByIdPath = '/api/v1/company/{id_company}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCompanyById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyById$Response(params: GetCompanyById$Params,token:string ,context?: HttpContext): Observable<StrictHttpResponse<Company>> {
    return getCompanyById(this.http, this.rootUrl, params,token, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCompanyById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyById(params: GetCompanyById$Params,token:string, context?: HttpContext): Observable<Company> {
    return this.getCompanyById$Response(params, token,context).pipe(
      map((r: StrictHttpResponse<Company>): Company => r.body)
    );
  }

  /** Path part for operation `getAllCompanyByStatus()` */
  static readonly GetAllCompanyByStatusPath = '/api/v1/company/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCompanyByStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompanyByStatus$Response(params: GetAllCompanyByStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllCompanyByStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCompanyByStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompanyByStatus(params: GetAllCompanyByStatus$Params, context?: HttpContext): Observable<void> {
    return this.getAllCompanyByStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllCompanyByDomaine()` */
  static readonly GetAllCompanyByDomainePath = '/api/v1/company/domaine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCompanyByDomaine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompanyByDomaine$Response(params: GetAllCompanyByDomaine$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllCompanyByDomaine(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCompanyByDomaine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCompanyByDomaine(params: GetAllCompanyByDomaine$Params, context?: HttpContext): Observable<void> {
    return this.getAllCompanyByDomaine$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
