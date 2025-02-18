import { Component, OnInit } from '@angular/core';
import { SubjectComponent } from '../../../shared/components/ui/subject/subject.component';
import { SubjectsService } from '../../services/subjects.service';
import { Subject } from '../../services/interfaces/subjects.adapter.res';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule,     } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizes',
  standalone: true,
  imports: [SubjectComponent ,ScrollingModule,RouterModule],
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.scss',
})
export class QuizesComponent implements OnInit {
  subs: Subscription[] = [];
  subjects: Subject[] = [];
  errorMessage: string | null = null;

  constructor(private _subjectsService: SubjectsService) {}

  ngOnInit(): void {
    this.getAllSubjects();
  }
  getAllSubjects() {
    const sub1 = this._subjectsService.getAllSubjects().subscribe({
      next: (res) => {
        console.log(res);
        this.subjects = res.data;
        this.errorMessage = res.err?.message ?? null;
      },
    });
    this.subs.push(sub1);
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
