import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParentService } from './parent/parent.service';
import { Observable, map } from 'rxjs';
import { ModifiedSchedule, ResponsemodifiedSchedules, ModifiedBy } from '../models/response-modified-shedule';

@Injectable({
  providedIn: 'root',
})
export class ModifiedShedulesService {


  constructor(private http: HttpClient, private __Parent: ParentService) {}

  createRegistry(token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    })
    return this.http.post<any>(`${this.__Parent.API_URL}dev/modifiedSchedule`, {},{headers:headers});
  }
  getRegirtry(token:any):Observable<ModifiedSchedule[]>{
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    })
    return this.http.get<ResponsemodifiedSchedules>(`${this.__Parent.API_URL}dev/modifiedSchedule`, {headers:headers})
    .pipe(
      map((resp)=>{
      return  resp.modifiedSchedules
      // .map((res)=> res.modifiedBy)
      })
    )
  }
}
