import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastTimeout: number = 3000; // Duration to show the toast (in milliseconds)
  showToast: boolean = false;
  title: string = '';
  message: string = '';
   
  constructor() { }

  
  show(title: string, message: string) {
    console.log("Shoen")
    this.title = title;
    this.message = message;
    this.showToast = true;

    setTimeout(() => {
      this.hide();
    }, this.toastTimeout);
  }

  hide() {
    this.showToast = false;
  }
}
