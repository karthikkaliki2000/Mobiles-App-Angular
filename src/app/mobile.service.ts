import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mobile } from './models/mobile.model';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http: HttpClient) { }
  url:string="http://localhost:8080/api/mobiles";

  fetchMobiles(): Observable<Mobile[]> {
  return this.http.get<Mobile[]>(this.url);
  }

  deleteMobile(id:number){
    return this.http.delete(this.url+"/"+id);
  }

  postMobile(body:any){
    return this.http.post(this.url+"/save",body,{headers: { 'Content-Type': 'application/json' }});

  }

  putMobile(body:any,id:number){
    return this.http.put(this.url+"/"+id,body);
  }



}
