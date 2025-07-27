class UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  passwoed: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.passwoed = password;
  }
}
export default UserModel;
