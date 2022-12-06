import { ControlersService } from 'src/app/services/parent/controlers.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agroIot';
  constructor(public _sctr: ControlersService){ 
  }

}
