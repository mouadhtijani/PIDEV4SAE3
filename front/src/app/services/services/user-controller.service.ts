/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findUserByEmail } from '../fn/user-controller/find-user-by-email';
import { FindUserByEmail$Params } from '../fn/user-controller/find-user-by-email';
import { findUserById } from '../fn/user-controller/find-user-by-id';
import { FindUserById$Params } from '../fn/user-controller/find-user-by-id';
import { findUserByToken } from '../fn/user-controller/find-user-by-token';
import { FindUserByToken$Params } from '../fn/user-controller/find-user-by-token';
import { getAllUserByClasseLevel } from '../fn/user-controller/get-all-user-by-classe-level';
import { GetAllUserByClasseLevel$Params } from '../fn/user-controller/get-all-user-by-classe-level';
import { getAllUserByRole } from '../fn/user-controller/get-all-user-by-role';
import { GetAllUserByRole$Params } from '../fn/user-controller/get-all-user-by-role';
import { getAllUserBySpeciality } from '../fn/user-controller/get-all-user-by-speciality';
import { GetAllUserBySpeciality$Params } from '../fn/user-controller/get-all-user-by-speciality';
import { getAllUserByStudentLevel } from '../fn/user-controller/get-all-user-by-student-level';
import { GetAllUserByStudentLevel$Params } from '../fn/user-controller/get-all-user-by-student-level';
import { setStudentProfile } from '../fn/user-controller/set-student-profile';
import { SetStudentProfile$Params } from '../fn/user-controller/set-student-profile';
import { setUserImage } from '../fn/user-controller/set-user-image';
import { SetUserImage$Params } from '../fn/user-controller/set-user-image';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setStudentProfile()` */
  static readonly SetStudentProfilePath = '/api/v1/user/student/{id_user}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setStudentProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setStudentProfile$Response(params: SetStudentProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return setStudentProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setStudentProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setStudentProfile(params: SetStudentProfile$Params, context?: HttpContext): Observable<User> {
    return this.setStudentProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `setUserImage()` */
  static readonly SetUserImagePath = '/api/v1/user/set-image/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setUserImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setUserImage$Response(params: SetUserImage$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return setUserImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setUserImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setUserImage(params: SetUserImage$Params, context?: HttpContext): Observable<void> {
    return this.setUserImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findUserById()` */
  static readonly FindUserByIdPath = '/api/v1/user/{id_user}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById$Response(params: FindUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return findUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById(params: FindUserById$Params, context?: HttpContext): Observable<User> {
    return this.findUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `findUserByToken()` */
  static readonly FindUserByTokenPath = '/api/v1/user/token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserByToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserByToken$Response(params: FindUserByToken$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return findUserByToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserByToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserByToken(params: FindUserByToken$Params, context?: HttpContext): Observable<User> {
    return this.findUserByToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `findUserByEmail()` */
  static readonly FindUserByEmailPath = '/api/v1/user/student';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserByEmail$Response(params: FindUserByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return findUserByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserByEmail(params: FindUserByEmail$Params, context?: HttpContext): Observable<User> {
    return this.findUserByEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllUserByStudentLevel()` */
  static readonly GetAllUserByStudentLevelPath = '/api/v1/user/student-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserByStudentLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserByStudentLevel$Response(params: GetAllUserByStudentLevel$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllUserByStudentLevel(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserByStudentLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserByStudentLevel(params: GetAllUserByStudentLevel$Params, context?: HttpContext): Observable<void> {
    return this.getAllUserByStudentLevel$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllUserBySpeciality()` */
  static readonly GetAllUserBySpecialityPath = '/api/v1/user/speciality';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserBySpeciality()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserBySpeciality$Response(params: GetAllUserBySpeciality$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllUserBySpeciality(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserBySpeciality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserBySpeciality(params: GetAllUserBySpeciality$Params, context?: HttpContext): Observable<void> {
    return this.getAllUserBySpeciality$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllUserByRole()` */
  static readonly GetAllUserByRolePath = '/api/v1/user/role';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserByRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserByRole$Response(params: GetAllUserByRole$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllUserByRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserByRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserByRole(params: GetAllUserByRole$Params, context?: HttpContext): Observable<void> {
    return this.getAllUserByRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllUserByClasseLevel()` */
  static readonly GetAllUserByClasseLevelPath = '/api/v1/user/classe-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserByClasseLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserByClasseLevel$Response(params: GetAllUserByClasseLevel$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return getAllUserByClasseLevel(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserByClasseLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserByClasseLevel(params: GetAllUserByClasseLevel$Params, context?: HttpContext): Observable<void> {
    return this.getAllUserByClasseLevel$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
