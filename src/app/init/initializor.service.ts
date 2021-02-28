import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/api.service';
import { EsIndex } from './es-index';
import { EsTemplate } from './es-template';
import { ServerState } from './server-state';

@Injectable({
  providedIn: 'root'
})
export class InitializorService {

  constructor(
    private templateApi: ApiService<EsTemplate, EsTemplate>,
    private indexApi: ApiService<EsIndex, EsIndex>,
    private http: HttpClient,
    private countApi: ApiService<number, any>
  ) {}

  checkServerState(url: string): Observable<JSON> {
    return this.http.get<JSON>(url);
  }

  checkEsServer(): void {
    // TODO: implement
  }

  getEsTemplate(name: string): Observable<EsTemplate> {
    return this.templateApi.get('/es/template/' + name); // TODO: implement
  }

  getEsIndex(type: string): Observable<EsIndex> {
    return of (); // TODO: implement
  }

  getEsIndices(type: string): Observable<EsIndex[]> {
    return of ([]); // TODO: implement
  }

  getStateUrl(type: string): string {
    if ('api' === type) {
      return this.templateApi.getBaseUrl() + '/state';
    }
    if ('es' === type) {
      return this.templateApi.getElasticsearchUrl() + '/';
    }
    if ('head' === type) {
      return this.templateApi.getHeadUrl() + '/';
    }
    return '';
  }

  getRecordCountUrl(name: string): string {
    if ('user' === name || 'customer' === name) {
      return '/' + name + '/count';
    }
    return '';
  }

  getRecordCount(url: string): Observable<number|undefined> {
    return this.countApi.post(url, {});
  }
}
