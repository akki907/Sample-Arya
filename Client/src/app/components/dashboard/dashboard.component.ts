import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ProfileService } from "./../../services/profile.service";
import { AuthService } from "./../../services/auth.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  image;
  localUrl;
  loadingBlogs = false;
  form;
  processing = false;
  messageClass;
  message;
  profileInfo;
  type;
  isActive = false;
  isProfilePresent;
  user;
  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    private auth: AuthService
  ) {
    this.createNewForm();
  }

  selectType(type) {
    this.type = type;
    this.isActive = true;
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      fullName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5)
        ])
      ],
      id: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5)
        ])
      ],
      address: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(5)
        ])
      ],
      DOB: ["", Validators.required]
    });
  }

  enableFormNewBlogForm() {
    this.form.get("fullName").enable();
    this.form.get("id").enable();
    this.form.get("address").enable();
    this.form.get("DOB").enable();
  }

  diasbleFormNewBlogForm() {
    this.form.get("fullName").disable();
    this.form.get("address").disable();
    this.form.get("id").disable();
    this.form.get("DOB").disable();
  }

  onSubmitHandle() {
    this.processing = true;
    this.diasbleFormNewBlogForm();
    console.log(`image`, this.localUrl);

    const profile = {
      id: this.form.get("id").value,
      address: this.form.get("address").value,
      DOB: this.form.get("DOB").value,
      fullName: this.form.get("fullName").value,
      type: this.type
    };
    this.profile.createProfile(profile).subscribe(data => {
      console.log(data);
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableFormNewBlogForm();
        //
      } else {
        this.uploadImagetoStorageContainer(this.localUrl);
        this.messageClass = "alert alert-success";
        this.message = data.message;

        setTimeout(() => {
          this.getProfile();
          this.message = false;
          this.isActive = false;
          this.form.reset();
          this.processing = false;
          this.enableFormNewBlogForm();
        }, 2000);
      }
    });
  }

  /* image function */

  getLocalStorageImage() {
    var dataImage = JSON.parse(localStorage.getItem("imgData"));
    this.image = dataImage;
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadImagetoStorageContainer(image) {
   
    const localStorageImage = localStorage.getItem("imgData");
    if (localStorageImage == null) {
      var images = [];
      // var obj = {user: this.user._id , [this.type]:image};
      images[0] = {user: this.user._id , [this.type]:image}
      localStorage.setItem("imgData", JSON.stringify(images));
    } else {
      const parseData = JSON.parse(localStorageImage);
      console.log(parseData);
      let id = this.user._id
      const type = this.type
      parseData.forEach(function(item) {
        if (id == item.user) {
          if(item[type] == type){
            item[type] = image
          }else{
            item[type] = image
          }
        }
      });
      localStorage.setItem("imgData", JSON.stringify(parseData));
    }
    this.getLocalStorageImage();
    this.localUrl = ''
    // window.location.reload();
  }

  getProfile() {
    this.profile.getUserProfile().subscribe(data => {
      var dataImage = JSON.parse(localStorage.getItem("imgData"));
      let user = JSON.parse(localStorage.getItem("user"))
      if(dataImage.length > 0){
        dataImage.forEach(function(item){
          if (user._id == item.user) {
            if(data.message.UID && item.UID) data.message.UID.image = item.UID
            if(data.message.passport && item.passport) data.message.passport.image = item.passport
            if(data.message.PanCard && item.PanCard) data.message.PanCard.image = item.PanCard
          }
        })
      }
      
      console.log(data.message)
      this.profileInfo = data.message;
      this.isProfilePresent = data.isProfile;
    });
  }

  userDetail() {
    this.user = this.auth.getUserDetail();
  }

  deleteProfileInfo(type){
    this.profile.deleteProfileInfo({type}).subscribe(data=>{
      this.getProfile();
    })
  }

  ngOnInit() {
    this.userDetail();
    this.getProfile();
   
  }
}
