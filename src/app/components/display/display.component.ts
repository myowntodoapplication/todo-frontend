import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { DisplayService } from 'src/app/shared/display.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
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
export class DisplayComponent implements OnInit {

  showtoast: boolean = false;
  type: any;
  message: string = '';
  autoCloseDelay: number = 5000;
  constructor(
    private authservice: AuthserviceService,
    private displayservice: DisplayService,    
    private Router: Router,
    private toastr:ToastrService
  ) { }

  notesdata: any;

  ngOnInit(): void {
    var object = this.authservice.service_get_user_from_local_storage();
    if (!object) {
      this.toastr.warning("Unauthorized User Logged Out")
      console.log("Unauthorized User Detected!!! Logged Out")
      this.authservice.service_logout();
    }
    else {
      this.fetchDataToDisplay(object.user_id);
    }
  }

  fetchDataToDisplay(user_id: number) {
    this.displayservice.service_getnotesuseridbased(user_id).subscribe(res => {
      // console.log(res)
      this.notesdata = res;
    })
  }

  onDeleteClick(note_id: number) {    
    this.displayservice.service_deleteanote(note_id).subscribe(res => {      
      // console.log(res)      
      this.toastr.success("Deleted Successfully")

      this.fetchDataToDisplay(this.authservice.service_get_user_from_local_storage().user_id);

    })
  }


  onUpdateNoteClick(note_id:Number){
    this.Router.navigate([`/update/${note_id}`]);
  }

  onLogoutClick() {
    localStorage.removeItem('user');
    this.Router.navigate(['/auth']);
  }

}
