import { finalize } from 'rxjs';
import { ControlersService } from './../../services/parent/controlers.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimbreService } from 'src/app/services/timbre.service';
import Swal from 'sweetalert2';
import { ModifiedShedulesService } from '../../services/modified-shedules.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public activar:boolean=true;
  public tocar:boolean=true;
  public editar:boolean=false;

  public formu!:    FormGroup;

  public scheduleId: any;
  da:any[]=[];
  public horari:any[]=[];
  public tipo:any[]=[
    {cod:"Cambio de clase"},
    {cod:"Entrada"},
    {cod:"Salida"},
    {cod:"Descanso"},
    // {cod:""},
  ];

  public sonara:any[]=[
    {cod: 1},
    {cod: 2},
    {cod: 3},
    // {cod: 4},
  ];

  constructor(
              private form     : FormBuilder,
              private _sCtr    : ControlersService,
              private _sTmb    : TimbreService,
              private _sModified    : ModifiedShedulesService,
                ) {
    // this.getHorarios();
    this.getHs();

   }

  ngOnInit(): void {
    this.createform()
    this.loadForm(this.horari);
    this._sCtr.getUserId()
  }
  get horario(){   return this.formu.get('horario') as FormArray};
  tocarTimbre(){
    this.tocar=true;
    this.putH(this.scheduleId, {tocar: true});
    // this.tocar=false;
    if(this.tocar){
      console.log('Timbre tocado');
Swal.fire({
  title: 'Tocando timbre!',
  icon: 'success',
  html: '<ng-container style="margin:0;"><i class="fa-solid fa-stopwatch fa-shake" style="font-size: 50px; color: rgb(255, 0, 0);"></i></ng-container>',
  timer: 5000,
  heightAuto:true,
  timerProgressBar: true,
  showConfirmButton: false,
  showCancelButton: false,
  backdrop:true,

})
    }

  }
  _validators = {
    existeHora: (field: string, array: FormArray) => (group: FormGroup) => {
      const value = group.controls[field].value;
      const existe = array.value.find((x:any) => x.start_time === value);
      if (existe) {
        console.log({ existeHora: true });
        return { existeHora: true };
      }
      return null;
    }
  };
  cambiarEstado(){
    this.activar=!this.activar;
    this.putH(this.scheduleId, {activo: this.activar})

  }

  createform(){
    this.formu= this.form.group({
      horario :this.form.array([],[Validators.required])
    })
  }

  enviar(){
    // console.log(this.formu.value);
    let sihay:boolean=false;
    let verifica:any[]= this.formu.value?.horario?.map((ele:any)=>ele?.start_time)
    // console.log(verifica);
    for (let i=0; i< verifica.length; i++){
      const cont= verifica.filter((x)=>x===verifica[i]);
      // console.log(cont);

      if (cont.length>1){
        sihay=true;
        break;
      }
    }
    // console.log(sihay);

    if(sihay){

      this._sCtr.showToastr_error('Hay horas repetidas')
      return;
    }
    // console.log(this.formu.valid);
    // console.log(this.formu.value);

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
      hora.sort((a:any, b:any) => a.start_time.localeCompare(b.start_time));
      let horario ={
        schedules:hora
      }
      console.log(horario);

      this.putH(this.scheduleId, horario);
      this._sCtr.showToastr_success('Horario actualizado')
    }
  }
  loadForm(schedule:any[]){
    this.horari= schedule;
    this.horario.clear();
    this.horari.forEach((hora: any) => {
      const horaForm = this.form.group({
        start_time: new FormControl(hora?.start_time),
        tipo: new FormControl(hora?.tipo),
        sonara: new FormControl(hora?.sonara),
      },{
      });
      this.horario.push(horaForm);
    });
  }

  addHora(){
    this.horario.push(
      this.form.group({
        start_time : ["", [Validators.required],[]],
        tipo       : ["", [Validators.required],[]],
        sonara     : ["", [Validators.required],[]],
      },{
        // validators: this._validators.existeHora('start_time', this.horario)
      })
    )
  }
  cancel(){
    this.editar=false
    this.loadForm(this.horari)
  }
  delHora(id:any){
    this.horario.removeAt(id);
    // this.formu.value?.horario.removeAt(id);
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
// --------------------------------------------------------------------------------------
  getHs(){
    this._sTmb.getHorario()
    .pipe(finalize(()=>{
      // this.getHId(this.scheduleId)
    }))
    .subscribe({
      next: (data:any)=>{
        // console.log(data);
        console.log(data[0]);
        this.activar=data[0]?.activo;
        this.scheduleId= data[0]?.id;

        this.horari=data[0]?.schedules;
      //  this.horari= this.horari.sort((a:any, b:any) => a.start_time.localeCompare(b.start_time));
        this.loadForm(this.horari);
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
  getHId(id:any){
    this._sTmb.getHorarioId(id)
    .pipe(finalize(()=>{
    }))
    .subscribe({
      next: (data:any)=>{
        console.log(data);

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

  postH(horario:any){
    this._sTmb.postHorario(horario)
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

  putH(id:any,horario:any){
    this._sTmb.putHorario(id, horario)
    .pipe(finalize(()=>{
      this.getHs();
    }))
    .subscribe({
      next: (data:any)=>{
        // if(this.tocar){
          // this._sCtr.showToastr_success('Horario actualizado')
        // }
        this._sModified.createRegistry(this._sCtr.token)
        .subscribe({
          next: () =>{
            // console.log(data);
          }
        })

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
  delteH(id:any){
    this._sTmb.deletHorario(id)
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
  // --------------------------------------------------------------------------------------------------------



}
