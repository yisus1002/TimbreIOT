import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Injectable({
  providedIn: 'root'
})
export class ControlersService {

  public token:any;
  constructor(
    private toastr: ToastrService
    ) { }

  leerToken(){
    if(localStorage.getItem('token')){
      this.token= localStorage.getItem('token');
    }else{
      this.token='';
    }
    return this.token;
  }
  // ----------------------------------------------------------------------
  showToastr_success(title: string) {
    this.toastr.success(`${title}`);
  }
  showToastr_error(title: string) {
    this.toastr.error(`${title}`);
  }
}
