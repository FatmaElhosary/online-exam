import { Exam } from './../../../../feature/services/interfaces/exams.adapter.res';
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

import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionsComponent } from '../../../../feature/pages/questions/questions.component';
import { QuestionDialogComponent } from '../../../../feature/pages/question-dialog/question-dialog.component';

@Component({
  selector: 'app-instruction-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    PrimaryButtonComponent,
    QuestionDialogComponent,
  ],
  templateUrl: './instruction-dialog.component.html',
  styleUrl: './instruction-dialog.component.scss',
})
export class InstructionDialogComponent {
  exam: Exam;
  startExam: boolean = false;
  constructor(public config: DynamicDialogConfig) {
    this.exam = this.config.data.exam;
  }

  instructions: InputSignal<string[]> = input([
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum dolor ddd amet consectetur.',
    'Lorem ipsum dolor eee amet consectetur.',
    'Lorem ipsum dolor qqqq amet consectetur.',
  ]);

  openExam() {
    //console.log(this.exam);
    this.startExam = true;
  }
}
