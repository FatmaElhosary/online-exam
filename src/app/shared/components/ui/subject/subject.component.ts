import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Subject } from '../../../../feature/services/interfaces/subjects.adapter.res';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CardModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  @Input() subject:Subject|undefined=undefined;
 
}
