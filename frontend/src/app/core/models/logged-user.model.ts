import { Role } from "../enum/role.enum";

export class UserDTO {
  userID: number;
  name: string;
  phoneNumber: string;
  email: string;
  role: Role;

  constructor() {
    this.userID = null as any;
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.role = null as any;
  }
}