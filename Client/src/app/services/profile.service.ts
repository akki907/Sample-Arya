import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthService } from "./auth.service";
@Injectable()
export class ProfileService {
  constructor(private http: Http, private auth: AuthService) {}

  createProfile(profile) {
    this.auth.createAuthenticationHeader();
    // return this.http.post(this.domain + 'blogs/createBlog',blog,this.options).map(res=> res.json())
    return this.http
      .post(
        `${this.auth.domain}/api/profile/createProfile`,
        profile,
        this.auth.options
      )
      .map(res => res.json());
  }

  getUserProfile() {
    this.auth.createAuthenticationHeader();
    // return this.http.post(this.domain + 'blogs/createBlog',blog,this.options).map(res=> res.json())
    return this.http
      .get(`${this.auth.domain}/api/profile/getUserProfile`, this.auth.options)
      .map(res => res.json());
  }

  deleteProfileInfo(data) {
    this.auth.createAuthenticationHeader();
    return this.http
      .post(
        `${this.auth.domain}/api/profile/deleteProfileInfo`,
        data,
        this.auth.options
      )
      .map(res => res.json());
  }
}
