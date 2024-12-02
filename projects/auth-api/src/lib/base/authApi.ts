import { Observable } from 'rxjs';
import { LoginDTO } from '../interfaces/login.dto';
import { LoginAdapterRes, LoginResponseDTO } from '../interfaces/loginRes.dto';
import { ErrorResponseDTO } from '../interfaces/error.interface';
import { RegisterDTO } from '../interfaces/register.dto';
import { RegisterAdapterRes } from '../interfaces/registerRes.dto';

export interface AuthApiInterface {
  login(data: LoginDTO): Observable<LoginAdapterRes | ErrorResponseDTO>;
  register(data: RegisterDTO): Observable<RegisterAdapterRes|ErrorResponseDTO>;

}
