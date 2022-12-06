import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ControlersService } from 'src/app/services/parent/controlers.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] =[
    'name',
    'lastName',
    'email',
    'rol',
    'password',
    'Opciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  public usuario:any
  constructor(private permissionsService: NgxPermissionsService,
              public _sctr: ControlersService,
              private _sUser: UsuarioService,
              private router: Router,
    
    ) {

  }
  ngAfterViewInit(): void {  
    this._sctr.dataSource.paginator = this.paginator;
    this._sctr.dataSource.sort = this.sort; 
  }

  ngOnInit(): void {
    this._sctr.createForm();
    this._sctr.loadForm('');
    this._sctr.leerToken();
    this.getUser();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    
    this._sctr.dataSource.filter = filterValue.trim().toLowerCase();

    if (this._sctr.dataSource.paginator) {
      this._sctr.dataSource.paginator.firstPage();
    }
  }
  getUser(){
    const id= localStorage.getItem('id')
    this._sUser.getuserId(this._sctr.token, id)
    .pipe(finalize(()=>{

    }))
    .subscribe({
      next :(data:any)=>{ 
        this.usuario=data?.user;
        localStorage.setItem('role', this.usuario?.role); 
        if(this.usuario?.role==='ADMIN'){
          this.permissionsService.loadPermissions([`${this.usuario?.role}`]);
    this._sctr.getUsers();
        }else{
          // this.permissionsService.loadPermissions([`${this.usuario?.role}`]);
          this.router.navigate(['/'])
        }
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this._sctr.showToastr_error((error?.error?.msg).toString())
        }else{
          this._sctr.showToastr_error(error?.message)
        }
      }
    })
  }

}
