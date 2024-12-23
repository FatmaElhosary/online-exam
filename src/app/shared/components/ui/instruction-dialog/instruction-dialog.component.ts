import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-instruction-dialog',
  standalone: true,
  imports: [DialogModule,ButtonModule],
  templateUrl: './instruction-dialog.component.html',
  styleUrl: './instruction-dialog.component.scss'
})
export class InstructionDialogComponent {
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
