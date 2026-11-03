export class CreateStaffDTO {
  name: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  adminID: number;

  constructor() {
    this.name = '';
    this.userName = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
    this.adminID = null as any;
  }
}