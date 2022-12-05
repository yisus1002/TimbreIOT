import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  exit(){
    localStorage.clear()
    location.reload()
    // setTimeout(() => {
      
    // this.router.navigate(['/login'])
    // }, 1000);
  }

}
