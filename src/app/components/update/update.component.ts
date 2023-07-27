import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { NgForm } from '@angular/forms';
import { InsertService } from 'src/app/shared/insert.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
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
export class UpdateComponent implements OnInit {
  @ViewChild('f') formRef!: NgForm;
  showtoast: boolean = false;
  type: any;
  message: string = '';
  autoCloseDelay: number = 5000;
  constructor(private authservice: AuthserviceService,
    private insertservice: InsertService,
    private Router: Router) {

    this.note_data = {
      detail: "",
      loc: null,
      note_date: "",
      note_id: null,
      note_insertion: "",
      subject: "",
      user_id: null
    }
  }

  ngOnInit(): void {
    var object = this.authservice.service_get_user_from_local_storage();
    if (!object) {
      console.log("Unauthorized User Detected!!! Logged Out")
      this.authservice.service_logout();
    }
    this.get_Note_Data_From_id(this.getNote_id_from_URL())


  }

  note_data: any;

  getNote_id_from_URL() {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const note_id = urlParts[urlParts.length - 1];
    const note_idAsNumber = parseInt(note_id);
    // console.log(note_idAsNumber);
    return note_idAsNumber;
  }

  get_Note_Data_From_id(note_id: Number) {
    this.insertservice.service_get_Note_Data_From_id(note_id).subscribe((res: any) => {
      this.note_data = res[0][0];
      // console.log(this.note_data)
    })
  }

  onUpdateClick(note_id: number) {    
    var object = this.authservice.service_get_user_from_local_storage();
    if (!object) {
      console.log("Unauthorized User Detected!!! Logged Out")
      this.authservice.service_logout();
    }
    else {
      const { subject, detail, date } = this.formRef.value;
      let user_id = object.user_id;
      this.showtoast = false;    
      this.insertservice.service_update({ user_id: user_id, subject: subject, detail: detail, date: date, note_id: note_id }).subscribe((res: any) => {        
        if (res[0][0].msg) {
          // console.log("updated");
          //++++++++++++++++++++++++++++++++++++++
          this.message = 'Successfully Updated';
          this.type = 'alert-success';
          this.showtoast = true;
          setTimeout(() => {
            this.showtoast = false;
          }, this.autoCloseDelay);
          //++++++++++++++++++++++++++++++++++++++
        }

        else {
          //++++++++++++++++++++++++++++++++++++++
          this.message = 'Not Updated';
          this.type = 'alert-danger';
          this.showtoast = true;
          setTimeout(() => {
            this.showtoast = false;

          }, this.autoCloseDelay);
          //++++++++++++++++++++++++++++++++++++++
          console.log("Not Updated")
        }
      })
    }
  }

  onLogoutClick() {
    localStorage.removeItem('user');
    this.Router.navigate(['/auth']);
  }

}
