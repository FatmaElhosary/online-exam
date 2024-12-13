import { Injectable } from '@angular/core';
import { SubjectApiInterface } from './base/subjectsApi';
import { SubjectsResAdapter } from './interfaces/subjects.adapter.res';
import { HttpClient } from '@angular/common/http';
import { SubjectsAPIEEndpoints } from './enums/subjects.api.endpoints';
import { catchError, map, Observable, of } from 'rxjs';
import { GetAllSubjectsAdapter } from './adapter/get-all-subjects.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService implements SubjectApiInterface {
  constructor(
    private _httpClient: HttpClient,
    private _getAllSubjectsAdapter: GetAllSubjectsAdapter
  ) {}
  getAllSubjects(): Observable<SubjectsResAdapter> {
    return this._httpClient.get(SubjectsAPIEEndpoints.GET_ALL_SUBJECTS).pipe(
      map((res: any) => this._getAllSubjectsAdapter.adapt(res)),
      catchError((err: any) => of(err))
    );
  }
}
