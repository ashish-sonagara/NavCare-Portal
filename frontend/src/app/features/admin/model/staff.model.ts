import { Role } from '../../../core/enum/role.enum';

export class StaffDTO {
  staffID: number;
  name: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: Role;
  adminID: number;
  createdAt?: Date | string;

  constructor() {
    this.staffID = null as any;
    this.name = '';
    this.userName = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = null as any;
    this.role = Role.STAFF;
    this.adminID = null as any;
  }
}