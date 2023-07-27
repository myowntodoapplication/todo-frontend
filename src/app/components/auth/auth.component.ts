import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('750ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('750ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  @ViewChild('f') formRef!: NgForm;
  showtoast:boolean=false;
  type:any;
  message: string = '';
  autoCloseDelay: number = 5000;
  constructor(private router: Router,
    private authservice: AuthserviceService,
    private toastrService:ToastService
  ) { }

  ngOnInit(): void {
    if (this.authservice.service_is_user_logged_in()) {
      this.toastrService.show("Successfully Logged In","Lets Get Started")
      this.router.navigate(['/landing']);
    }

  }

  MoveToLanding() {
    this.router.navigate(['/landing']);
  }

  LoginClick() {

    if (!this.formRef.value.email || !this.formRef.value.password) {        
      this.showtoast = false;     
        this.message='Fill All Fields';
        this.type='alert-warning';
        this.showtoast=true;       
        setTimeout(() => {
          this.showtoast=false;
        }, this.autoCloseDelay);                
      return;
    }

    const { email, password } = this.formRef.value;

    this.authservice.service_login({ email: email, password: password }).subscribe((res: any) => {
      this.showtoast = false;
      if (res[0].length > 2) {
        //Correct Credentials        
        // console.log(res[0][0][0])
        this.authservice.service_update_user(res[0][0][0]);        
        this.message='Successfully Logged In';
        this.type='alert-success';
        this.showtoast=true;       
        setTimeout(() => {
          this.showtoast=false;
        }, this.autoCloseDelay);                
        this.router.navigate(['/landing']);

      }
      else {
        //Wrong credentials                
        this.showtoast = false;
        this.message='OOPS Wrong Credentials';
        this.type='alert-danger';
        this.showtoast=true;       
        setTimeout(() => {
          this.showtoast=false;
        }, this.autoCloseDelay);                      
        // console.log(res[0][0][0].msg);
      }
    }
      , error => {
        this.showtoast = false;
        this.message='Internet Error';
        this.type='alert-danger';
        this.showtoast=true;       
        setTimeout(() => {
          this.showtoast=false;
        }, this.autoCloseDelay);                      
        // console.log(error)
      })
  }

}
