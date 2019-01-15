import { IReport } from "../interfaces/report.interface";
import { User } from './user.model';
import * as moment from 'moment-timezone';

export class Report {
  id: number;
  user: User;
  name: string;
  createdAt: any;
  updatedAt: any;

  constructor(data: IReport) {
    this.id = data.id;
    //this.user = data.user ? new User(data.user) : null;
    this.name = data.name;
    //this.createdAt = data.created_at ? new Date(moment.utc(data.created_at).tz('America/New_York').format('YYYY/MM/DD HH:mm:ss')) : null;
    //this.updatedAt = data.updated_at ? new Date(moment.utc(data.updated_at).tz('America/New_York').format('YYYY/MM/DD HH:mm:ss')) : null;
  }

}
