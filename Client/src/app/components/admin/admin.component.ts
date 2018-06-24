import { Component, OnInit } from "@angular/core";
import { AdminServiceService } from "./../../services/admin-service.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  profiles
  page = 1;
  constructor(private admin: AdminServiceService) {}

  getProfiles(){

    this.admin.getAllProfile({skip:this.page,limit:5}).subscribe(data=>{
      
      this.profiles = data.data
    })
  }

  deleteUserProfile(id){
    this.admin.deleteById(id).subscribe(data=>{
      console.log(data)
      this.getProfiles()
    })
  }

  ngOnInit() {
    this.getProfiles()
  }
}
