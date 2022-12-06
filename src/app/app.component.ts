import { ControlersService } from 'src/app/services/parent/controlers.service';
import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _sctr: ControlersService, private permissionsService: NgxPermissionsService ){ 
  
    const role =localStorage.getItem('role');
    if(role==='ADMIN'){
      this.permissionsService.loadPermissions([`${role}`]);
    }
  }

}
