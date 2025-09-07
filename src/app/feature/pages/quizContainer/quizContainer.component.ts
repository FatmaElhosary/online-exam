import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizCardComponent } from './components/quizCard/quizCard.component';
import { DialogModule } from 'primeng/dialog';
import { Exam } from '../../services/interfaces/exams.adapter.res';
import { ExamsService } from '../../services/exams.service';
@Component({
  selector: 'app-quizContainer',
  standalone: true,
  imports: [DialogModule, QuizCardComponent],
  templateUrl: './quizContainer.component.html',
  styleUrl: './quizContainer.component.scss',
})
export class QuizContainerComponent {
  private subscription = new Subscription();
  quizzes: Exam[] = [];
  exam!: Exam;
  errorMessage: string | null = '';
  subjectId: string | null = '';
  subjectName: string | null = '';
  questionDialogVisible = signal(false);
  constructor(
    private _examsService: ExamsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
          console.log('exams', res.data);
          this.quizzes = res.data;
          this.errorMessage = res.err?.message ?? null;
        },
      });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
