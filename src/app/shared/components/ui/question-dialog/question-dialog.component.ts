
import {
  Component,
  Input,
  input,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TimerComponent } from '../timer/timer.component';

import { ProgressBarModule } from 'primeng/progressbar';
import { Question } from '../../../../feature/services/interfaces/questions.adapter.res';
import { Exam } from '../../../../feature/services/interfaces/exams.adapter.res';
import { QuestionComponent } from '../question/question.component';
import { Subscription } from 'rxjs';
import { QuestionsService } from '../../../../feature/services/questions.service';

@Component({
  selector: 'app-question-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    ProgressBarModule,
    TimerComponent,
    QuestionComponent
],
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss',
})
export class QuestionDialogComponent implements OnInit, OnDestroy {
  visible = model(false);
  // @Input() exam: Exam = {
  //   _id: '670070cc30a3c3c1944a9c66',
  //   title: 'React Quiz',
  //   duration: 25,
  //   subject: '67003aad728c92b7fdf4350e',
  //   numberOfQuestions: 25,
  //   active: true,
  //   createdAt: '2024-10-04T22:48:44.245Z',
  // };
  exam = input.required<Exam>();
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal(0);
  subscription = new Subscription();
  constructor(private _questionsService: QuestionsService) {}
  ngOnInit(): void {
    console.log('exam', this.exam());
    this.getAllQuestionsOnExam();
  }

  get currentQuestion():Question {
    return this.questions()[this.currentQuestionIndex()];
  }
  getAllQuestionsOnExam() {
    const sub = this._questionsService
      .getAllQuestionsOnExam(this.exam()._id)
      .subscribe({
        next: (res) => {
          console.log('questions', res);
          this.questions.set(res.data);
          //  this.errorMessage = res.err?.message ?? null;
        },
      });
    this.subscription.add(sub);
  }
  getPreQuestion() {
    if (this.currentQuestionIndex() > 0)
    this.currentQuestionIndex.update((value) => value--);
  }
  getNextQuestion() {
    console.log('next');
    if (this.currentQuestionIndex() < this.questions.length - 1) 
    this.currentQuestionIndex.update((value) => value++);
  }
  ngOnDestroy(): void {
    
     
    this.subscription.unsubscribe();
  }
}
