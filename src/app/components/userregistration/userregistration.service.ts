/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  url1 = 'user-registration';
  url = 'pemis';

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private appConfig: AppConfig
  ) {}

  create(data: any) {
    return this.api.post(this.url1, data);
  }
  changePassword(data:any){
    return this.api.post(this.url1+"/change-password", data);
  }

  update(id: any, data: any) {
    return this.api.put(this.url1 + '/' + id, data);
  }

  getUserType(){
    return this.api.get(this.url+"/getUserType");
  }
  getpasswordhistory(){
    return this.api.get(this.url1+"/getpasswordhistory");
  }

  getAgency(){
    return this.api.get(this.url+"/getAgency");
  }
  getLineMinistry(){
    return this.api.get(this.url+"/getLineMinistry");
  }

  getList(perPage: string | number, page: string | number, searchTerm?: string, sortKey?: string, sortDir?: boolean) {
    let urlPart = '?perPage=' + perPage + '&page=' + page;
    if (typeof searchTerm !== 'undefined' || searchTerm !== '') {
      urlPart += '&searchOption=all&searchTerm=' + searchTerm;
    }
    if (typeof sortKey !== 'undefined' || sortKey !== '') {
      urlPart += '&sortKey=' + sortKey;
    }
    if (typeof sortDir !== 'undefined' && sortKey !== '') {
      if (sortDir) {
        urlPart += '&sortDir=desc';
      } else {
        urlPart += '&sortDir=asc';
      }
    }
    return this.api.get(this.url1 + urlPart);
  }
  getEdit(id: string) {
    return this.api.get(this.url1 + '/' + id);
  }
  remove(id: string) {
    return this.api.delete(this.url1 + '/' + id);
  }

  uploadFile(form:FormData){
    return this.http.post(this.appConfig.baseUrl+"file-repo/storefiles",form);
  }

  updateImage(form:FormData){
    return this.api.post(this.url1+'/updateImage',form);
  }

  getUpdatedImage(){
    return this.api.get(this.url1+"/getUpdatedImage")
  }
}
