import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import qs from 'qs'

import { catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  private formateErrors(error: any) {
    return throwError(error.error)
}

get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.baseUrl}${path}`, { params })
        .pipe(catchError(this.formateErrors))
}

put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
        `${environment.baseUrl}${path}`,
        JSON.stringify(body)
    ).pipe(catchError(this.formateErrors))
}

post(path: string, params: Object = {}): Observable<any> {
    return this.http.post(
        `${environment.baseUrl}${path}?${qs.stringify(params)}`,
        {}
    ).pipe(catchError(this.formateErrors))
}

delete(path): Observable<any> {
    return this.http.delete(
        `${environment.baseUrl}${path}`
    ).pipe(catchError(this.formateErrors))
}
}