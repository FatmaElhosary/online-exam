import { Component, Input, OnDestroy } from '@angular/core';
import { Exam } from '../../../../services/interfaces/exams.adapter.res';
import { PrimaryButtonComponent } from '../../../../../shared/components/ui/primary-button/primary-button.component';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InstructionDialogComponent } from '../../../../../shared/components/ui/instruction-dialog/instruction-dialog.component';

@Component({
  selector: 'app-quizCard',
  standalone: true,
  imports: [PrimaryButtonComponent, DynamicDialogModule],
  templateUrl: './quizCard.component.html',
  styleUrl: './quizCard.component.scss',
  providers: [DialogService],
})
export class QuizCardComponent implements OnDestroy {
  @Input({ required: true }) quiz!: Exam;
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  openExam() {
    console.log(this.quiz);
    //open Exam Dialog
    this.ref = this.dialogService.open(InstructionDialogComponent, {
      data: {
        exam: this.quiz,
      },
      width: '50vw',
      modal: false,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    // this.startExam.emit(true);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
