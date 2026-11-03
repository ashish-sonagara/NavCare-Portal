import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StaffAPIService } from '../../service/staff-api.service';

export interface StaffDTO {
  userID: number;
  name: string;
  phoneNumber: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-staff-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './staff-list.html',
})
export class StaffList implements OnInit {
  private readonly staffApiService = inject(StaffAPIService);
  readonly staff = signal<StaffDTO[]>([]);

  searchText = '';
  pageNo = 1;
  pageSize = 100;
  noStaffFound = false;
  staffLoader = false;
  loadStaffData = false;
  totalRecords = 0;

  error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchAllStaff('');
  }

  fetchAllStaff(event: any) {
    if (this.loadStaffData || (event && this.staff().length >= this.totalRecords)) {
      return;
    }

    this.noStaffFound = false;
    this.staffLoader = true;
    this.loadStaffData = true;

    if (event === '') {
      this.pageNo = 1;
      this.staff.set([]);
    } else {
      this.pageNo = Number(this.pageNo) + 1;
    }

    let params = new HttpParams();
    if (this.searchText) params = params.set('searchText', this.searchText.trim());
    params = params.set('pageNo', String(this.pageNo));
    params = params.set('pageSize', String(this.pageSize));


    this.staffApiService.fetchStaffList(params).subscribe({
      next: res => this.handleStaffResponse(res, event),
      error: () => {
        this.loadStaffData = false;
        this.staffLoader = false;
        this.error.set('Unable to load staff.');
      }
    });
  }

  handleStaffResponse(res: any, event: any) {
    if (res.success === true) {
      const result = res.serviceResult ?? res.data ?? res;
      this.pageNo = Number(result.pageNo ?? this.pageNo);
      this.totalRecords = Number(result.totalRecords ?? result.totalElements ?? 0);
      const newRecords: StaffDTO[] = result.records ?? result.content ?? [];

      if (event === '') {
        this.staff.set(newRecords);
      } else {
        const existingIds = new Set(this.staff().map(staff => staff.userID));
        const uniqueNewRecords = newRecords.filter(staff => !existingIds.has(staff.userID));
        if (uniqueNewRecords.length > 0) {
          this.staff.update(current => [...current, ...uniqueNewRecords]);
        }
      }

      this.noStaffFound = this.staff().length === 0;
      this.error.set(null);
    } else {
      this.error.set(res.message ?? 'Unable to load staff.');
    }

    this.loadStaffData = false;
    this.staffLoader = false;
  }

  onSearch() {
    this.fetchAllStaff('');
  }
}
