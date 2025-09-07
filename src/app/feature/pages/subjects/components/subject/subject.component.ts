import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Subject } from '../../../../services/interfaces/subjects.adapter.res';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CardModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent {
  @Input() subject: Subject | undefined = undefined;
}
