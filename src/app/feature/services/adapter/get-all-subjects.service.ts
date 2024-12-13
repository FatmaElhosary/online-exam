import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { SubjectsResAdapter, SubjectsResDTO } from '../interfaces/subjects.adapter.res';

@Injectable({
  providedIn: 'root',
})
export class GetAllSubjectsAdapter implements Adapter{
  constructor() {}
  adapt(data:SubjectsResDTO) :SubjectsResAdapter{
  return{
    message:data.message,
    pagination:data.metadata,
    data:data.subjects,
    err:data.error, 
  }
  }


}
