import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { StaffDTO } from '../model/staff.model';

@Injectable({ providedIn: 'root' })
export class StaffAPIService {

  constructor(private apiService: APIService) {}

  fetchStaffList(params: HttpParams) {
    return this.apiService.getParams('admin/staff/staffList' , params)
  }

  addStaff(body: StaffDTO) {
    return this.apiService.post('admin/staff/addStaff', body)
  }
}