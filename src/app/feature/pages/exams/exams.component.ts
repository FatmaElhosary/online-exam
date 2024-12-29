import { QuestionDialogComponent } from './../../../shared/components/ui/question-dialog/question-dialog.component';
import { Subscription } from 'rxjs';
import { Exam } from './../../services/interfaces/exams.adapter.res';
import { ExamsService } from './../../services/exams.service';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/ui/navbar/navbar.component';
import { ExamComponent } from '../../../shared/components/exam/exam.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InstructionDialogComponent } from '../../../shared/components/ui/instruction-dialog/instruction-dialog.component';
import { DialogStateService } from '../../services/dialog-state.service';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    DialogModule,
    ExamComponent,
    ButtonModule,
    InstructionDialogComponent,
    QuestionDialogComponent,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent {
  private subscription = new Subscription();
  quizzes: Exam[] = [];
  exam! :Exam;
  errorMessage: string | null = '';
  subjectId: string | null = '';
  subjectName: string | null = '';
  questionDialogVisible = signal(false);
  constructor(
    private _examsService: ExamsService,
    private _activatedRoute: ActivatedRoute,
    public _dialogStateService: DialogStateService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subjectId = this._activatedRoute.snapshot.queryParamMap.get('subject');
    this.subjectName =
      this._activatedRoute.snapshot.queryParamMap.get('subjectName');

    this.getAllExamsOnSujsect();
  }
  getAllExamsOnSujsect() {
    const sub = this._examsService
      .getAllExamsOnSubject(this.subjectId!)
      .subscribe({
        next: (res) => {
          console.log('exams',res);
          this.quizzes = res.data;
          this.errorMessage = res.err?.message ?? null;
        },
      });
    this.subscription.add(sub);
  }

  startExam() {
    this._dialogStateService.closeDialog();
    console.log('start exam ');
    //open exam modal
    this.questionDialogVisible.set(true);
  }
  openExamDialog(quiz:Exam) {
    this.exam=quiz;
    console.log('exam',this.exam);
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
