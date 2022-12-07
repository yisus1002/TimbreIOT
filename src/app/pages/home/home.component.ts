import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  public horari:any[]=[
    { hi: '08:00', hf: '09:00',},
  ];

  constructor( private form     : FormBuilder,) { }

  ngOnInit(): void {
    this.createform()
    this.loadForm();
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
      return
    }else{
      this.editar=false
      console.log(this.formu.value);

    }
  }

  loadForm(){
    // this.horario.clear();
    // this.horari= [];
    this.horari.forEach((hora:any)=>this.horario.push(this.form.group({
      hi: new FormControl(hora?.hi),
      hf: new FormControl(hora?.hf),
    })))
  }

  addHora(){
    this.horario.push(
      this.form.group({
        hi : ["", [Validators.required],[]],
        hf : ["", [Validators.required],[]],
      })
    )
  }

  delHora(id:any){
    this.horario.removeAt(id)
  }
  public getCtrl(key: string, form: FormGroup) { 
    return  (<FormArray>form.get(key)); 
  }

}
