import * as moment from 'moment-timezone';
import { IUser } from '../interfaces/user.interface';

export class User {
  id: number;
  email: string;
  name: string;
  username: string;
  password: string;
  createdAt: any;
  updatedAt: any;
  lastLoginAt: any;

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.name = data.name;
    this.password = data.password;
    //this.createdAt = data.created_at ? new Date(moment.utc(data.created_at).tz('America/New_York').format('YYYY/MM/DD HH:mm:ss')) : null;
    //this.updatedAt = data.updated_at ? new Date(moment.utc(data.updated_at).tz('America/New_York').format('YYYY/MM/DD HH:mm:ss')) : null;
    //this.lastLoginAt = data.last_login_at ? new Date(moment.utc(data.last_login_at).tz('America/New_York').format('YYYY/MM/DD HH:mm:ss')) : null;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      name: this.name,
      password: this.password
    };
  }
}
