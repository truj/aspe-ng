import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * This service is mainly used to communicate with the backend API.
 *
 * Usage from another class:
 *
 * constructor(private apiService: ApiService<ResponseClass, PayloadClass>) {
 *   this.apiService.put(url, payloadObj).subscribe(
 *     (res) => this.responseObj = res,
 *     (err) => this.handleError(),
 *   )
 * }
 *
 * R (Response Class): The class to be expected as API response
 * P (Payload Class): The payload class for PUT or POST requests
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService<R, P> {

  postOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  putOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  public get(url: string): Observable<R> {
    return this.http.get<R>(this.getBaseUrl() + url);
  }

  public post(url: string, entity: P): Observable<R> {
    return this.http.post<R>(this.getBaseUrl() + url, entity, this.postOptions);
  }

  public put(url: string, entity: P): Observable<R> {
    return this.http.put<R>(this.getBaseUrl() + url, entity, this.postOptions);
  }

  public getBaseUrl(): string {
    return 'http://localhost:8080';
  }

  public getElasticsearchUrl(): string {
    return 'http://localhost:9200';
  }

  public getHeadUrl(): string {
    return 'http://localhost:9100';
  }
}
