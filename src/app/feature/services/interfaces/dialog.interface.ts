import { WritableSignal } from '@angular/core';

export interface DialogInterface {
  dialogVisible: WritableSignal<boolean>; // Shared signal for dialog visibility

  openDialog(): void;

  closeDialog(): void;
}
