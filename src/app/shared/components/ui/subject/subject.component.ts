import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CardModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  @Input() subject:string='HTML';
  @Input() subjectImagSrc='assets\images\bgImage.png';

}
