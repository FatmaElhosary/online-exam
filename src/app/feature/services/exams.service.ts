import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { ExamsApiInterface } from './base/examsApi';
import { catchError, map, Observable, of } from 'rxjs';
import { ExamsResAdapter } from './interfaces/exams.adapter.res';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetAllExamsOnSubjectAdapter } from './adapter/get-all-examsonsubject.service';
import { ExamsAPIEEndpoints } from './enums/exams.api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class ExamsService implements ExamsApiInterface {
  constructor(
    private _httpClient: HttpClient,
    private _getAllExamsOnSubjectAdapter: GetAllExamsOnSubjectAdapter
  ) {}
  getAllExamsOnSubject(subjectId: string): Observable<ExamsResAdapter> {
    // Setup log namespace query parameter
    let params = new HttpParams().set('subject', subjectId);

    return this._httpClient
      .get(ExamsAPIEEndpoints.GET_ALL_EXAMS_ON_SUBJECT, { params: params })
      .pipe(
        map((res: any) => this._getAllExamsOnSubjectAdapter.adapt(res)),
        catchError((err: any) => of(err))
      );
  }
}
