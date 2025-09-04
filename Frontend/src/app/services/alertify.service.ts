import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor(private toast: HotToastService) { }


  success(message: string) {
    this.toast.success(message);
  }

  error(message: string) {
    this.toast.error(message);
  }

  warning(message: string) {
    this.toast.warning(message);
  }

  message(message: string) {
    this.toast.info(message);
  }

}
