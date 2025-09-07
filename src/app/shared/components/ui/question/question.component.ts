import { Component, input } from '@angular/core';
import { Question } from '../../../../feature/services/interfaces/questions.adapter.res';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, CheckboxModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  selectedAnswer: string | null = null;
  question = input.required<Question>();

  
}
