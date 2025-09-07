import {
  Component,
  input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { Question } from '../../services/interfaces/questions.adapter.res';
import { QuestionComponent } from '../../../shared/components/ui/question/question.component';
import { Exam } from '../../services/interfaces/exams.adapter.res';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [DialogModule, ButtonModule, QuestionComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnDestroy, OnInit {
  //exam:  Exam;
  exam = input.required<Exam>();
  questions: WritableSignal<Question[]> = signal<Question[]>([]);
  questionId: number = 0;
  subscription = new Subscription();

  constructor(
    private _questionsService: QuestionsService,
    // public config: DynamicDialogConfig
  ) {
    // this.exam = this.config.data.exam;
  }
  ngOnInit(): void {
    console.log(this.exam);
    this.getAllQuestionsOnExam();
  }

  getAllQuestionsOnExam() {
    const sub = this._questionsService
      .getAllQuestionsOnExam(this.exam()._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.questions.set(res.data);
          //  this.errorMessage = res.err?.message ?? null;
        },
      });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
