import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {
  domain = "http://localhost:9000";
  authToken;
  user;
  options;
  constructor(private http: Http) {}

  createAuthenticationHeader() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem("token");
  }

  registerUser(user) {
    return this.http
      .post(this.domain + "/auth/register", user)
      .map(res => res.json());
  }

  login(user) {
    return this.http
      .post(this.domain + "/auth/login", user)
      .map(res => res.json());
  }

  checkUsername(username) {
    return this.http
      .get(this.domain + "/auth/checkUserName/" + username)
      .map(res => res.json());
  }
  checkEmail(email) {
    return this.http
      .get(this.domain + "/auth/checkEmail/" + email)
      .map(res => res.json());
  }

  storeUserData(token) {
    var decoded = jwt_decode(token);
    console.log("sadas", decoded);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(decoded));
    this.authToken = token;
    this.user = decoded;
    return decoded.role;
  }

  getUserDetail() {
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
    return JSON.parse(user);
  }

  getProfile() {
    this.createAuthenticationHeader();
    return this.http
      .get(this.domain + "/auth/profile", this.options)
      .map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
