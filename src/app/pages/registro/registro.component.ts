import { Component, OnInit } from '@angular/core';
import { ModifiedShedulesService } from '../../services/modified-shedules.service';
import { ModifiedBy, ModifiedSchedule } from '../../models/response-modified-shedule';
import { ControlersService } from '../../services/parent/controlers.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  ModifiedSchedule:ModifiedSchedule[]=[];
  aux:ModifiedSchedule[]=[];
  loading:boolean = false;
  constructor(
    public _sModified: ModifiedShedulesService,
    private _sCtr: ControlersService,
    ) { }

  ngOnInit(): void {
    this.loading=true;
    this._sModified.getRegirtry(this._sCtr.token)
    .pipe(
      finalize(()=>{})
    )
    .subscribe({
      next: (data)=>{
        data.sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1)
        this.aux=data;
        // data.slice(-1);
        console.log(data);
        this.loading=false;;
        this.ModifiedSchedule=data.slice(-10);
      }
    })
  }

  verTodos(){
    if(this.ModifiedSchedule.length===this.aux.length){
      this._sCtr.showToastr_error("Son todos")
      return
    }
    this.ModifiedSchedule=this.aux;

  }

}
