import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
 import { ExamsResAdapter, ExamsResDTO } from '../interfaces/exams.adapter.res';

@Injectable({
  providedIn: 'root',
})
export class GetAllExamsOnSubjectAdapter implements Adapter{
  constructor() {}
  adapt(data:ExamsResDTO ) :ExamsResAdapter{
  return{
    message:data.message,
    pagination:data.metadata,
    data:data.exams,
    err:data.error, 
  }
  }


}
