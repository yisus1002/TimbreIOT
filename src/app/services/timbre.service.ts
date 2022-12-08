import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class TimbreService {

  constructor(
    private http: HttpClient,
    private __Parent: ParentService) { }


    getShedule():Observable<any>{
      // const headers = new HttpHeaders({ 
      //   'Authorization': `${token}` 
      // })
     return this.http.get<any>(`${this.__Parent.API_URL}dev/schedule`,)
    }
    getSheduleId(id:any):Observable<any>{
      // const headers = new HttpHeaders({ 
      //   'Authorization': `${token}`
      // })
     return this.http.get<any>(`${this.__Parent.API_URL}dev/schedule/${id}`)
    }
    postShedule(token:any, schedule:any):Observable<any>{
      const headers = new HttpHeaders({ 
        'Authorization': `${token}`
      })
     return this.http.post<any>(`${this.__Parent.API_URL}dev/schedule`, schedule, {headers: headers})
    }
    putSheduleId(token:any,id:any, schedule:any):Observable<any>{
      const headers = new HttpHeaders({ 
        'Authorization': `${token}`
      })
     return this.http.put<any>(`${this.__Parent.API_URL}dev/schedule/${id}`, schedule, {headers: headers})
    }
    deletedSheduleId(token:any,id:any):Observable<any>{
      const headers = new HttpHeaders({ 
        'Authorization': `${token}`
      })
     return this.http.delete<any>(`${this.__Parent.API_URL}dev/schedule/${id}`, {headers: headers})
    }
}
