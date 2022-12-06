import { NgxPermissionsService } from 'ngx-permissions';
import { Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr'; 
import { User } from 'src/app/models/user.molel';
import { UsuarioService } from '../usuario.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { NavigationEnd, Router, Event } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {

  public token:any;
// ------------------------------------
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort; 


dataSource= new MatTableDataSource<User>();

// ------------------------------------

currentRoute?:string;
// ------------------------------------

nameform:string='';
formu!:FormGroup;
hide = true;
editarC:boolean=true;
public changeC: boolean    = false;

user:any; 
public rol:any[]=[
  {role:'USER'},
  {role:'ADMIN'},
];


  constructor(
    public router: Router,
    private _sUser: UsuarioService,
    private toastr: ToastrService,
    private form: FormBuilder,
    private permissionsService: NgxPermissionsService,
    ) {
      this.verificarRuta()
     }

  leerToken(){
    if(localStorage.getItem('token')){
      this.token= localStorage.getItem('token');
    }else{
      this.token='';
    }
    return this.token;
  }
  // ----------------------------------------------------------------------
  public get emailNoValid(){   return this.formu.get('email')?.invalid    && this.formu.get('email')?.touched;};
  public get roleNoValid(){   return this.formu.get('role')?.invalid    && this.formu.get('role')?.touched;};
  public get passwordNoValid(){return this.formu.get('password')?.invalid && this.formu.get('password')?.touched;};
  public get nameNoValid(){return this.formu.get('name')?.invalid && this.formu.get('name')?.touched;};
  public get lastNameNoValid(){return this.formu.get('lastName')?.invalid && this.formu.get('lastName')?.touched;};

  createForm(){
    this.formu= this.form.group({
      name:     ["", [Validators.required, Validators.minLength(3)], []],
      lastName: ["", [Validators.required, Validators.minLength(3)], []],
      email:    ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")], []],
      password: ["", [Validators.required, Validators.minLength(3)], []],
      role: ["", [Validators.required, ], []],
    })
  }
  loadForm(user:any){
    this.formu.reset({
      name: user?.name,
      lastName: user?.lastName,
      email:   user?.email,
      // password:user?.password,
      role: user?.role,
    })
  }

  // ----------------------------------------------------------------------
  enviar(){
    console.log(this.formu.valid);
    if(this.formu.invalid){  
      
      return Object.values(this.formu.controls).forEach(controls=>{
        controls.markAllAsTouched()
      })
    }else{ 
      console.log(this.formu.value);
      
      if(this.nameform==='Agregar'){
        this.postUser();
      }else if(this.nameform==='Editar'){
        this.putUser()
      }
    }
  }
  // ----------------------------------------------------------------------
  cambiarContrasena(){
    this.editarC=! this.editarC;
    this.changeC=! this.changeC;
    if(this.changeC===true){
      this.formu=this.form.group({
        ...this.formu.controls,
        password: ["", [Validators.required, Validators.minLength(3)], []],
      });
      this.formu.reset({
        ...this.formu.value,
        password: '',
      })
    }else{
      this.formu.removeControl('password')
      this.loadForm(this.user)
    }
  return  this.formu;
  }
  // ----------------------------------------------------------------------
  
  agregar(){
    this.nameform="Agregar"
    this.editarC=true;
    this.loadForm('')
    this.formu=this.form.group({
      ...this.formu.controls,
      password: ["", [Validators.required, Validators.minLength(3)], []],
    });
  }
  editar(user:any){
    this.editarC=false;
    this.nameform="Editar";
    this.changeC=false;
    this.user=user
    this.formu.removeControl('password')
    this.loadForm(this.user) 
  }
  eliminar(user:any){
    this.user=user;
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.delUser(user?.id) 
      }
    })
    
  }

  postUser(){
    this._sUser.postuser(this.token, this.formu.value)
    .pipe( finalize(()=>{
      this.loadForm('')
      this.getUsers();
    }))
    .subscribe({
      next:(data:any)=>{  
        
        this.showToastr_success(`Usuario ${data?.user?.name} creado`)
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this.showToastr_error((error?.error?.msg).toString())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }

  getUserId(){
    if(localStorage.getItem('id')){
      const id =localStorage.getItem('id');
      this._sUser.getuserId(this.token, id)
      .pipe( finalize(()=>{
      }))
      .subscribe({
        next:(data:any)=>{  
          this.user=data?.user 
          console.log(this.user);
          localStorage.setItem('role', this.user?.role); 
          if(this.user?.role==='ADMIN'){
            this.permissionsService.loadPermissions([`${this.user?.role}`]);
          }else{
            // this.permissionsService.loadPermissions([`${this.user?.role}`]);
            // this.router.navigate(['/'])
          }
        },
        error: (error:any)=>{
          if(error?.error?.msg){
            this.showToastr_error((error?.error?.msg).toString())
          }else{
            this.showToastr_error(error?.message)
          }
        }
      })
    }else{

    }

  }
  getUsers(){
    this._sUser.getuser(this.token)
    .pipe( finalize(()=>{
    }))
    .subscribe({
      next:(data:any)=>{ 
        this.dataSource.data=data?.users;
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this.showToastr_error((error?.error?.msg).toString())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  } 

  delUser(id:any){
    this._sUser.deletuser(this.token, id)
    .pipe( finalize(()=>{
      if(this.currentRoute==='/perfil'){
        localStorage.clear()
        location.reload()
      }else{
        this.dataSource.data = this.dataSource.data.filter((ele:any)=>ele.id!==this.user?.id) 
      }
    }))
    .subscribe({
      next:(data:any)=>{ 
        this.showToastr_success('Usuario eliminado')
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this.showToastr_error((error?.error?.msg).toString())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }
  putUser(){
    this._sUser.putuser(this.token, this.user?.id, this.formu.value)
    .pipe( finalize(()=>{
      this.loadForm(this.user)
      this.editarC=false;
      this.changeC=false;
      if(this.currentRoute==='/usuarios'){
      this.getUsers()
      }
    }))
    .subscribe({
      next:(data:any)=>{  
        this.user=data?.user
        this.showToastr_success(`Usuario ${data?.user?.name} editado`)
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this.showToastr_error((error?.error?.msg).toString())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }
  // ----------------------------------------------------------------------
  verificarRuta(){
    this.router.events.subscribe((event: Event) => {
            
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
            console.log(this.currentRoute);
      }
  });
  }
  // ----------------------------------------------------------------------
  showToastr_success(title: string) {
    this.toastr.success(`${title}`);
  }
  showToastr_error(title: string) {
    this.toastr.error(`${title}`);
  }
}
