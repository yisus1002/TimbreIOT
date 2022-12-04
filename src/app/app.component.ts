import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agroIot';
  currentRoute?:string;
  constructor(public router: Router){
    this.verificarRuta();

  }
  verificarRuta(){
    this.router.events.subscribe((event: Event) => {
            
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
            console.log(this.currentRoute);

      }
      // console.log(this.currentRoute)
  });
  }

}
