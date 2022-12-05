import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] =[
    'name',
    'lastName',
    'email',
    'Opciones'
  ];
  nameform:string='';
  formu!:FormGroup;
  hide = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  
  public options  : number[]=[5,10,25,];
  
  dataSource= new MatTableDataSource<any>();

  constructor(private form: FormBuilder,) {
  }
  ngAfterContentInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  ngOnInit(): void {
    this.createForm();
    this.loadForm();
  }

  public get emailNoValid(){   return this.formu.get('email')?.invalid    && this.formu.get('email')?.touched;};
  public get passwordNoValid(){return this.formu.get('password')?.invalid && this.formu.get('password')?.touched;};
  public get nameNoValid(){return this.formu.get('name')?.invalid && this.formu.get('name')?.touched;};
  public get lastNameNoValid(){return this.formu.get('lastName')?.invalid && this.formu.get('lastName')?.touched;};

  createForm(){
    this.formu= this.form.group({
      name:     ["", [Validators.required, Validators.minLength(3)], []],
      lastName: ["", [Validators.required, Validators.minLength(3)], []],
      email:    ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")], []],
      password: ["", [Validators.required, Validators.minLength(3)], []],
    })
  }
  loadForm(){
    this.formu.reset({
      name: '',
      lastName: '',
      email    :'',
      password :'',
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  enviar(){
    if(this.formu.invalid){  
      
      return Object.values(this.formu.controls).forEach(controls=>{
        controls.markAllAsTouched()
      })
    }else{ 
      console.log(this.formu.value); 
    }
  }

  agregar(){
    this.nameform="Agregar"
  }
}
