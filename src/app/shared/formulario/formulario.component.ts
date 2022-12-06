import { ControlersService } from './../../services/parent/controlers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  constructor(
    public _sctr: ControlersService,
  ) { }

  ngOnInit(): void {
  }

}
