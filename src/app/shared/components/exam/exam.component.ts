import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Exam } from '../../../feature/services/interfaces/exams.adapter.res';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
@Input() quiz:Exam= {
  "_id": "670070cc30a3c3c1944a9c66",
  "title": "React Quiz",
  "duration": 25,
  "subject": "67003aad728c92b7fdf4350e",
  "numberOfQuestions": 25,
  "active": true,
  "createdAt": "2024-10-04T22:48:44.245Z"
};
}
