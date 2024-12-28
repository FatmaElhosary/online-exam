import {
  Component,
  Input,
  input,
  InputSignal,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Question } from '../../../../feature/services/interfaces/questions.adapter.res';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit {
  selectedAnswer: string | null = null;
  //progress: number = 5; // Progress percentage (5% for 1/20 questions)
  timer: number = 14.59; // Timer in seconds
  question = input.required<Question>();

  // @Input() question!:Question;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.question);
  }
}
