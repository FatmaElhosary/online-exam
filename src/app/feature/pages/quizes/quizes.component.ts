import { Component, OnInit } from '@angular/core';
import { SubjectComponent } from '../../../shared/components/ui/subject/subject.component';
import { SubjectsService } from '../../services/subjects.service';
import { Subject } from '../../services/interfaces/subjects.adapter.res';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-quizes',
  standalone: true,
  imports: [SubjectComponent ,ScrollingModule],
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.scss',
})
export class QuizesComponent implements OnInit {
  sub: any[] = [];
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
    this.sub.push(sub1);
  }
  ngOnDestroy(): void {
    this.sub[0].unsubscribe();
  }
}
