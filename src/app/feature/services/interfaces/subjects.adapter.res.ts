import { ErrorResponseDTO } from "./error";

 
export interface SubjectsResDTO {
    message: string,
    metadata: MetaData,
    subjects: Subject[],
    error:ErrorResponseDTO
    
  }
  export interface MetaData{
    
        currentPage: number,
        numberOfPages: number,
        limit: number
  
  }
  export interface Subject{
        _id: string,
        name:  string,
        icon:  string,
        createdAt:  string
   
  }
export interface SubjectsResAdapter{
    message:string;
    data:Subject[],
    pagination:MetaData,
    err:ErrorResponseDTO ;
    
}