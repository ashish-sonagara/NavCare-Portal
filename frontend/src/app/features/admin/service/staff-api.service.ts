import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StaffAPIService {

  constructor(private apiService: APIService) {}

  fetchStaffList(params: HttpParams) {
    return this.apiService.getParams('/staff' , params)
  }
}