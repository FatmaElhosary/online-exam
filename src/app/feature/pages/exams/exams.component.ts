import { Subscription } from 'rxjs';
import { Exam } from './../../services/interfaces/exams.adapter.res';
import { ExamsService } from './../../services/exams.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/ui/navbar/navbar.component';
import { ExamComponent } from '../../../shared/components/exam/exam.component';
import { ButtonModule } from 'primeng/button';
import { InstructionDialogComponent } from '../../../shared/components/ui/instruction-dialog/instruction-dialog.component';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [ExamComponent, ButtonModule, InstructionDialogComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent {
 private subscription = new Subscription();
  quizzes: Exam[] = [];
  errorMessage: string | null = '';
  subjectId: string | null = '';
  subjectName: string | null = '';
  constructor(
    private _examsService: ExamsService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.getAllExamsOnSujsect();
  }
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
          console.log(res);
          this.quizzes = res.data;
          this.errorMessage = res.err?.message ?? null;
        },
      });
    this.subscription.add(sub);
  }

  startExam() {
    //open modal
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
