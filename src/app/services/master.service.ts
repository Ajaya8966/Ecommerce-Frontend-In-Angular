import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../shared/components/app-config/environment';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private get GET_API_URL(): string {
    return Environment.apiGateway;
  }
  constructor(private _http: HttpClient) {}

  saveMaster(apiEndpoint: string, data: any): Observable<any> {
    return this._http.post<any>(${this.GET_API_URL}${apiEndpoint}, data);
  }
  getMaster(api: string): Observable<any> {
    return this._http.get<any>(${this.GET_API_URL}${api});
  }}