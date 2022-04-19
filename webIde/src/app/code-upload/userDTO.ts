export class UserDTO {
  username: string;
  password: string;
  email: string;
  isStudent: boolean;
  supervisorId: number;


  constructor(username: string, password: string, email: string, isStudent: boolean, supervisorId: number) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.isStudent = isStudent;
    this.supervisorId = supervisorId;
  }
}
