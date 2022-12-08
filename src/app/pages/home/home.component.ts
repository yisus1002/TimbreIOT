import { finalize } from 'rxjs';
import { ControlersService } from './../../services/parent/controlers.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimbreService } from 'src/app/services/timbre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public activar:boolean=true;
  public tocar:boolean=false;
  public editar:boolean=false;
  
  public formu!:    FormGroup;
  // public schedules: any; 
  public scheduleId: any; 
  da:any[]=[
    {
        "end_time": "02:00",
        "start_time": "11:01"
    },
    {
        "end_time": "03:20",
        "start_time": "02:17"
    }
]
  public horari:any[]=[
    // { start_time: '08:00', end_time: '09:00',},
    // { start_time: '09:00', end_time: '10:00',},
    // { start_time: '10:00', end_time: '11:00',},
    // { start_time: '11:00', end_time: '12:00',},
    // { start_time: '12:00', end_time: '13:00',},
  ];

  constructor( 
              private form     : FormBuilder,
              private _sCtr    : ControlersService,
              private _sTmb    : TimbreService,
                ) {
    this.getHorarios();
    
   }

  ngOnInit(): void {
    this.createform()
    this.loadForm(this.horari);
    this._sCtr.getUserId()
  }
  get horario(){   return this.formu.get('horario') as FormArray};
  tocarTimbre(){
    this.tocar=true;
    if(this.tocar){
      console.log('Timbre tocado');
    }
    
  }

  cambiarEstado(){
    this.activar=!this.activar;
  }

  createform(){
    this.formu= this.form.group({
      horario :this.form.array([],[Validators.required])
    })
  }
  enviar(){
    console.log(this.formu.valid);
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(controls=>{
        if(controls instanceof FormGroup){
          Object.values(controls.controls).forEach(controls=>controls.markAllAsTouched())
        }else{
          controls.markAllAsTouched();
        }
      });
    }else{
      this.editar=false;
      let hora:any[]=this.formu.value?.horario;
      let horario ={
        schedule:hora
      }
      this.putHoratioId(this.scheduleId, horario)
    }
  }
  loadForm(schedule:any[]){
    this.horari= schedule;
    this.horario.clear();
    this.horari.forEach((hora:any)=>this.horario.push(this.form.group({
      end_time  : new FormControl(hora?.end_time),
      start_time: new FormControl(hora?.start_time),
    })))
  }

  addHora(){
    this.horario.push(
      this.form.group({
        start_time : ["", [Validators.required],[]],
        end_time   : ["", [Validators.required],[]],
      })
    )
  }
  cancel(){
    this.editar=false
    this.loadForm(this.horari)
  }
  delHora(id:any){
    this.horario.removeAt(id)
  }
  public getCtrl(key: string, form: FormGroup) { 
    return  (<FormArray>form.get(key)); 
  }

  getHorarios(){
    this._sTmb.getShedule()
    .pipe(finalize(()=>{
      
    }))
    .subscribe({
      next: (data:any)=>{
        this.scheduleId=data?.schedules[0].id
        this.horari=data?.schedules[0].schedule
        this.loadForm(this.horari)
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this._sCtr.showToastr_error((error?.error?.msg).toString())
        }else{
          this._sCtr.showToastr_error(error?.message)
        }
      }
    })
  }
  getHorarioid(id:any){
    this._sTmb.getSheduleId(id)
    .pipe(finalize(()=>{
    }))
    .subscribe({
      next: (data:any)=>{
        
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this._sCtr.showToastr_error((error?.error?.msg).toString())
        }else{
          this._sCtr.showToastr_error(error?.message)
        }
      }
    })
  }

  postHorario(schedule:any){
    this._sTmb.postShedule(this._sCtr.token,schedule)
    .pipe()
    .subscribe({
      next: (data:any)=>{
        
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this._sCtr.showToastr_error((error?.error?.msg).toString())
        }else{
          this._sCtr.showToastr_error(error?.message)
        }
      }
    })
  }
  putHoratioId(id:any, schedule:any){
    this._sTmb.putSheduleId(this._sCtr.token, id, schedule)
    .pipe(finalize(()=>{
      this.getHorarios()
    }))
    .subscribe({
      next: (data:any)=>{
        this._sCtr.showToastr_success('Horario actualizado')
        
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this._sCtr.showToastr_error((error?.error?.msg).toString())
        }else{
          this._sCtr.showToastr_error(error?.message)
        }
      }
    })
  }

  deletHorario(id:any){
    this._sTmb.deletedSheduleId(this._sCtr.token, id)
    .pipe()
    .subscribe({
      next: (data:any)=>{
      },
      error: (error:any)=>{
        if(error?.error?.msg){
          this._sCtr.showToastr_error((error?.error?.msg).toString())
        }else{
          this._sCtr.showToastr_error(error?.message)
        }
      }
    })
  }

}
