import { Injectable, signal } from '@angular/core';
import { DialogInterface } from './interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogStateService  implements DialogInterface{
  dialogVisible = signal(false); // Shared signal for dialog visibility
  constructor() { }

  openDialog() {
    this.dialogVisible.set(true);
  }

  closeDialog() {
    this.dialogVisible.set(false);
  }
}
