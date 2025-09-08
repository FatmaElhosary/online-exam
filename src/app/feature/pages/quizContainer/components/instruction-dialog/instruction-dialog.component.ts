import { Exam } from '../../../../services/interfaces/exams.adapter.res';
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

import { PrimaryButtonComponent } from '../../../../../shared/components/ui/primary-button/primary-button.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionsComponent } from '../../../questions/questions.component';
import { QuestionDialogComponent } from '../../../question-dialog/question-dialog.component';

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
    console.log('Exaaaam', this.exam);
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
