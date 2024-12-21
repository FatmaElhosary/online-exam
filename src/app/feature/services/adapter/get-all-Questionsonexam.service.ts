import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import {
  QuestionsResAdapter,
  QuestionsResDTO,
} from '../interfaces/questions.adapter.res';

@Injectable({
  providedIn: 'root',
})
export class GetAllQuestionsOnExamAdapter implements Adapter {
  constructor() {}
  adapt(data: QuestionsResDTO): QuestionsResAdapter {
    return {
      message: data.message,
      data: data.questions,
      err: data.error,
    };
  }
}
