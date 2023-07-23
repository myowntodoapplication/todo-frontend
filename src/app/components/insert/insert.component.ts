import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { NgForm } from '@angular/forms';
import { InsertService } from 'src/app/shared/insert.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
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
export class InsertComponent implements OnInit {
  @ViewChild('f') formRef!: NgForm;
  constructor(private authservice: AuthserviceService,
    private insertservice: InsertService,
    private Router: Router) { }

  ngOnInit(): void {
    var object = this.authservice.service_get_user_from_local_storage();
    if (!object) {
      console.log("Unauthorized User Detected!!! Logged Out")
      this.authservice.service_logout();
    }
  }


  onInsertClick() {

    if (!this.formRef.value.subject || !this.formRef.value.detail || !this.formRef.value.date) {
      return;
    }

    var object = this.authservice.service_get_user_from_local_storage();
    if (!object) {
      console.log("Unauthorized User Detected!!! Logged Out")
      this.authservice.service_logout();
    }
    else {
      const { subject, detail, date } = this.formRef.value;
      let user_id = object.user_id;
      this.insertservice.service_insert({ user_id: user_id, subject: subject, detail: detail, date: date }).subscribe((res: any) => {
        console.log(res[0][0].msg)
      })
    }
  }

  onLogoutClick() {
    localStorage.removeItem('user');
    this.Router.navigate(['/auth']);
  }

}
