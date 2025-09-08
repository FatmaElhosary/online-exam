import {
  Component,
  input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { QuestionsService } from '../../services/questions.service';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TimerComponent } from '../../../shared/components/ui/timer/timer.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { Question } from '../../services/interfaces/questions.adapter.res';
import { Exam } from '../../services/interfaces/exams.adapter.res';
import { LoadingComponent } from '../../../shared/components/ui/loading/loading.component';
import { ScoresChartComponent } from './components/scores-chart/scores-chart.component';
import { MdalView } from './enums/modelView.enum';
import { ReviewAnswersComponent } from "./components/review-answers/review-answers.component";

@Component({
  selector: 'app-question-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    ProgressBarModule,
    TimerComponent,
    RadioButtonModule,
    CheckboxModule,
    PrimaryButtonComponent,
    FormsModule,
    LoadingComponent,
    ScoresChartComponent,
    ReviewAnswersComponent
],
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss',
})
export class QuestionDialogComponent implements OnInit, OnDestroy {
  exam = input.required<Exam>();
  questions = signal<Question[]>([]);
  currentQuestionIndex: WritableSignal<number> = signal(0);
  subscription = new Subscription();
  selectedAnswer: string | null = null;
  loading: boolean = false;
  MdalView = MdalView; // expose enum to template
  modalView: MdalView = MdalView.Quextions;
  constructor(private _questionsService: QuestionsService) {}
  ngOnInit(): void {
    // console.log('exam', this.exam());

    this.getAllQuestionsOnExam();
  }

  get currentQuestion(): Question {
    return this.questions()[this.currentQuestionIndex()];
  }
  get questionNumbers(): number[] {
    return Array.from({ length: this.questions().length }, (_, i) => i + 1);
  }
  getAllQuestionsOnExam() {
    this.loading = true;
    const sub = this._questionsService
      .getAllQuestionsOnExam(this.exam()._id)
      .subscribe({
        next: (res) => {
          this.loading = false;
          console.log('questions', res);
          this.questions.set(res.data);
          //  this.errorMessage = res.err?.message ?? null;
        },
      });
    this.subscription.add(sub);
  }
  getPreQuestion() {
    if (this.currentQuestionIndex() > 0)
      this.currentQuestionIndex.set(this.currentQuestionIndex() - 1);
  }
  getNextQuestion() {
    // console.log(this.currentQuestionIndex() + 1);
    // console.log(this.questions().length);
    if (
      this.currentQuestionIndex() + 1 != this.questions().length  &&
      this.selectedAnswer
    ) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
    } else {
      // Finished Exam
      this.modalView = MdalView.ResulrChart;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
