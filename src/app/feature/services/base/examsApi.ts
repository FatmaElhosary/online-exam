import { Observable } from "rxjs";
 import { ExamsResAdapter } from "../interfaces/exams.adapter.res";

export interface ExamsApiInterface{
    getAllExamsOnSubject(subjectId:string):Observable< ExamsResAdapter >;
}