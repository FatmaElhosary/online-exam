import { QuestionsAPIEEndpoints } from './enums/questions.api.endpoints';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuestionsApiInterface } from './base/questionsApi';
import { QuestionsResAdapter } from './interfaces/questions.adapter.res';
import { GetAllQuestionsOnExamAdapter } from './adapter/get-all-Questionsonexam.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService implements QuestionsApiInterface {
  constructor(
    private _httpClient: HttpClient,
    private _getAllQuestionsOnExamAdapter: GetAllQuestionsOnExamAdapter
  ) {}
  getAllQuestionsOnExam(examId: string): Observable<QuestionsResAdapter> {
    // Setup log namespace query parameter
    const params = new HttpParams().set('exam', examId);

    return this._httpClient
      .get(
        `${environment.baseUrl}${QuestionsAPIEEndpoints.GET_ALL_QUESTIONS_ON_EXAM}`,
        { params: params }
      )
      .pipe(
        map((res: any) => this._getAllQuestionsOnExamAdapter.adapt(res)),
        catchError((err: any) => of(err))
      );
  }
}
