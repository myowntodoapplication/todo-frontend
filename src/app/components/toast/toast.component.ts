import { Component, OnInit,Input } from '@angular/core';
import { ToastService } from '../../shared/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {


  @Input() type: 'alert-success' | 'alert-danger' | 'alert-info' | 'alert-warning' = 'alert-success';
  @Input() message: string = '';
  @Input() autoCloseDelay: number = 5000;
  @Input() show: boolean = false;
  // show: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.autoCloseDelay > 0) {
      setTimeout(() => {
        this.show=false;
        this.close();
      }, this.autoCloseDelay);
    }    
  }
  close(): void {
    this.show = false;
  }
}
