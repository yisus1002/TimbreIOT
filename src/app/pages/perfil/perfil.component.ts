import { Component, OnInit } from '@angular/core';
import { ControlersService } from 'src/app/services/parent/controlers.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    public _sctr: ControlersService,) {
      this._sctr.leerToken();
      this._sctr.getUserId();
     }

  ngOnInit(): void {
    this._sctr.createForm();

  }
  eliminarCuenta(){
    // console.log(this._sctr.user);
    this._sctr.eliminar(this._sctr.user);
    
  }

}
