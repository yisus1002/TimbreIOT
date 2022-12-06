import { ControlersService } from './parent/controlers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ParentService } from './parent/parent.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public idUser:any;
  public habilitar:boolean=false;

  constructor(private http:HttpClient,
              private router: Router, 
              private _sCtrl: ControlersService,
              private __Parent: ParentService,
              private permissionsService: NgxPermissionsService) { 
                this._sCtrl.leerToken(); 
              }

 postLogin(email:any, password:any):Observable<any>{ 
   return (this.http.post<any>(`${this.__Parent.API_URL}dev/auth/login`,{email,password}))
 }


 getToken(email:any, password:any){
    
  this.habilitar=true;
  this.postLogin(email, password)
  .pipe(finalize(()=>{
    this.habilitar=false;
  }))
  .subscribe({
    next: (data:any)=>{  
      this.idUser=data?.user?.id;
      this.saveToken(data?.token, this.idUser, data?.user?.role);
      this.router.navigate(['/home'])

    },
    error:(error:any)=>{ 
      if(error?.error?.msg){
        this._sCtrl.showToastr_error((error?.error?.msg).toString())
      }else{
        this._sCtrl.showToastr_error(error?.message)
      }
    }
  })
}


saveToken(token:string, id:number,role:any){
  this._sCtrl.token =token;
  localStorage.setItem('token', token);
  localStorage.setItem('id', id.toString());

  if(role==="ADMIN"){
    localStorage.setItem('role', role);
    const perm = ["ADMIN"];
    this.permissionsService.loadPermissions(perm);
  }else{
    localStorage.setItem('role', role);
  }

  let hoy = new Date();
  hoy.setSeconds(86400);
  localStorage.setItem('expira', hoy.getTime().toString())
}

isAutentificado():boolean{ 
  if(this._sCtrl.token.length<2){
    return false;
  }
  const expira = Number(localStorage.getItem('expira')); 
  const expiraDate = new Date();
  expiraDate.setTime(expira);
  if(expiraDate> new Date()){
    return true;
  }else{
    return false;
  }
  // return this.userToken.length > 2;
     // Check whether the token is expired and return
  // true or false
  // return !this.jwtHelper.isTokenExpired(token);
}

}


