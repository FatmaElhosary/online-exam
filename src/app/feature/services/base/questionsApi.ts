import { Observable } from 'rxjs';
import { QuestionsResAdapter } from '../interfaces/questions.adapter.res';

export interface QuestionsApiInterface {
  getAllQuestionsOnExam(examId: string): Observable<QuestionsResAdapter>;
}
