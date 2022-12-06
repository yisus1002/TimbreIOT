import { User } from './../models/user.molel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private __Parent: ParentService
  ) { }

  getuser(token:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `${token}` 
    })
    return this.http.get<any>(`${this.__Parent.API_URL}dev/user/`, {headers: headers})
  }
  getuserId(token:any, id_user:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `${token}` 
    })
    return this.http.get<any>(`${this.__Parent.API_URL}dev/user/${id_user}`, {headers: headers})
  }

  postuser(token:any,user:User):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `${token}` 
    })
    return this.http.post<any>(`${this.__Parent.API_URL}dev/user/`, user,{headers:headers});
  }

  putuser(token:any, id_user:any,user:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `${token}` 
    })
    return this.http.put<any>(`${this.__Parent.API_URL}dev/user/${id_user}`, user, {headers:headers});
  }


  deletuser(token:any, id_user:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `${token}` 
    })
    return this.http.delete<any>(`${this.__Parent.API_URL}dev/user/${id_user}`, {headers:headers});
  }

}
