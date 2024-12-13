import { Observable } from "rxjs";
import { SubjectsResAdapter } from "../interfaces/subjects.adapter.res";

export interface SubjectApiInterface{
    getAllSubjects():Observable< SubjectsResAdapter>;
}