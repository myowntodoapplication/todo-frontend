import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from 'src/app/shared/authservice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  @ViewChild('f') formRef!: NgForm;
  constructor(private router: Router,
    private authservice: AuthserviceService,
  ) { }

  ngOnInit(): void {
    if (this.authservice.service_is_user_logged_in()) {
      this.router.navigate(['/landing']);
    }

  }

  MoveToLanding() {
    this.router.navigate(['/landing']);
  }

  LoginClick() {

    if (!this.formRef.value.email || !this.formRef.value.password) {
      return;
    }

    const { email, password } = this.formRef.value;

    this.authservice.service_login({ email: email, password: password }).subscribe((res: any) => {
      if (res[0].length > 2) {
        //Correct Credentials        
        console.log(res[0][0][0])
        this.authservice.service_update_user(res[0][0][0]);
        this.router.navigate(['/landing']);

      }
      else {
        //Wrong credentials        
        console.log(res[0][0][0].msg);
      }
    }
      , error => {
        console.log(error)
      })
  }

}
