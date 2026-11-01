import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class LoginAPIService {

  constructor(private api: APIService) {}

  Login(body: any): Observable<any> {
    return this.api.post('authentication/login', body);
  }
}
