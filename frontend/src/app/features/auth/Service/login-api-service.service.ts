import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { CreateAdminDTO } from '../Model/create-admin.model';

@Injectable({ providedIn: 'root' })
export class LoginAPIService {

  constructor(private api: APIService) {}

  login(body: any): Observable<any> {
    return this.api.post('authentication/login', body);
  }

  signUp(body: CreateAdminDTO) {
    return this.api.post('authentication/registerAdmin', body)
  }
}
