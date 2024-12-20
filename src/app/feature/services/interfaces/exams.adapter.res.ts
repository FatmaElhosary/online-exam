import { ErrorResponseDTO } from './error';

export interface ExamsResDTO {
  message: string;
  metadata: MetaData;
  exams: Exam[];
  error: ErrorResponseDTO;
}
export interface MetaData {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}
export interface ExamsResAdapter {
  message: string;
  data: Exam[];
  pagination: MetaData;
  err: ErrorResponseDTO;
}
