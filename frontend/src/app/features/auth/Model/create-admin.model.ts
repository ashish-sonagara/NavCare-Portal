export class CreateAdminDTO {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;

  constructor() {
    this.name = '';
    this.username = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
  }
}