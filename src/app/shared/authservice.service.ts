import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  user: any;
  local_storage_user: any;
  baseURL = 'http://localhost:2004'
  constructor(
    private http: HttpClient,
    private Router: Router
  ) { }

  service_update_user(object: any) {
    this.user = object;
  }
  service_get_user() {
    return this.user;
  }

  service_login(object: any) {
    // console.log("auth service")
    return this.http.post(`${this.baseURL}/api/auth/login`, object).pipe(map((user: any) => {

      if (user[0].length > 2) {
        // console.log(user[1],"user");
        localStorage.setItem("user", JSON.stringify(user[1]));
      }
      return user;
    }));
  }

  service_logout() {
    localStorage.removeItem('user');
    this.Router.navigate(['/auth']);
  }

  service_get_user_from_local_storage() {
    const token = localStorage.getItem('user');
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return JSON.parse(payload).user;
    } else {

      // console.log("user null")
      this.Router.navigate(['/auth']);
      return null;
    }
  }

  // service_get_user_from_local_storage(){            
  //   this.local_storage_user=  localStorage.getItem("user")?.toString();
  //   return JSON.parse(this.local_storage_user);
  // }
  service_is_user_logged_in() {
    if (localStorage.getItem("user") != undefined) {
      return true;
    }
    return false
  }
}

