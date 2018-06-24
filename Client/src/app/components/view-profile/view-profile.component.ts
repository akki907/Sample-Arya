import { Component, OnInit } from "@angular/core";
import { AdminServiceService } from "./../../services/admin-service.service";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "./../../services/profile.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.css"]
})
export class ViewProfileComponent implements OnInit {
  isLoading = false;
  profileInfo;
  stateId
  constructor(
    private admin: AdminServiceService,
    private route: ActivatedRoute,
    private profile: ProfileService,
    private location: Location
  ) { 
   this.stateId =   this.route.params
  }

  getById() {
    this.isLoading = true;
    this.admin.getById(this.stateId.value.id).subscribe(profile => {
      console.log(profile);
      this.isLoading = false;
      this.profileInfo = profile.message;
    });
  }

  backClicked() {
    this.location.back();
  }

  deleteProfileInfo(type) {
    this.profile.deleteProfileInfo({ type }).subscribe(data => {
      this.getById();
    });
  }
  ngOnInit() {
    this.getById();
  }
}
