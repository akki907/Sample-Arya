import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(
    private auth : AuthService,
    private router : Router,
    
  ) {
    
   }
  


  onLogout(){
    this.auth.logout();
    this.router.navigate(['/']) 
  }

  ngOnInit() {

  }
}
