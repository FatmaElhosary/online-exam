import { Observable } from "rxjs";
import { LoginDTO } from "../interfaces/login.dto";
import { LoginAdapterRes, LoginResponseDTO } from "../interfaces/loginRes.dto";

export  interface AuthApiInterface{
    login(data:LoginDTO):Observable< LoginAdapterRes|never[]>;
    register(data:any):Observable< any>
}