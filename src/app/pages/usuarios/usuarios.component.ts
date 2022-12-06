import { ControlersService } from 'src/app/services/parent/controlers.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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



  constructor( 
              public _sctr: ControlersService,
    
    ) {
  }
  ngAfterViewInit(): void {
    this._sctr.dataSource.paginator = this._sctr.paginator;
    this._sctr.dataSource.sort = this._sctr.sort; 
  }

  ngOnInit(): void {
    this._sctr.createForm();
    this._sctr.loadForm('');
    this._sctr.leerToken();
    this._sctr.getUsers();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._sctr.dataSource.filter = filterValue.trim().toLowerCase();

    if (this._sctr.dataSource.paginator) {
      this._sctr.dataSource.paginator.firstPage();
    }
  }



}
