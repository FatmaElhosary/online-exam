import {
  Component,
  EventEmitter,
  Input,
  input,
  InputSignal,
  model,
  Output,
  signal,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogStateService } from '../../../../feature/services/dialog-state.service';

@Component({
  selector: 'app-instruction-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, CommonModule],
  templateUrl: './instruction-dialog.component.html',
  styleUrl: './instruction-dialog.component.scss',
})
export class InstructionDialogComponent {
  constructor(public _dialogStateService: DialogStateService) {}
  @Output() startExam = new EventEmitter();
  instructions: InputSignal<string[]> = input([
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum dolor sit amet consectetur.',
  ]);

  onDialogHide() {
    this._dialogStateService.dialogVisible.set(false);
    this.startExam.emit(); // Update signal when dialog is hidden
  }
}
