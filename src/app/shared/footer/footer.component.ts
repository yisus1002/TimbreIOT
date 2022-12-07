import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public anio:any;
  constructor() { 

    const today= new Date();
    this.anio= today.getFullYear()
  }

  ngOnInit(): void {
  }

}
