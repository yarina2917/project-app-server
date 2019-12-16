export class User {
  public _id: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';
  public role: string = '';
}

export const roles = ['Admin', 'User'];
