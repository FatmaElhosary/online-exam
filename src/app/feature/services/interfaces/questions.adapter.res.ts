import { ErrorResponseDTO } from './error';
import { Exam } from './exams.adapter.res';
import { Subject } from './subjects.adapter.res';

export interface QuestionsResDTO {
  message: string;

  questions: Question[];
  error: ErrorResponseDTO;
}

export interface Question {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Subject;
  exam: Exam;
  createdAt: string;
}
export interface Answer {
  answer: String;
  key: string;
}

export interface QuestionsResAdapter {
  message: string;
  data: Question[];
  err: ErrorResponseDTO;
}
