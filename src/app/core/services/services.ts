import { AuthenticationService } from './authentication.service';
import { UrlManagerService } from '../url-manager.service';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { PaginationService } from './pagination.service';
import { SortService } from './sort.service';
import { FileService } from "./file.service";
import { ReportService } from "./report.service";

/**
 * Array of core services for the app SPA
 */
export const CORE_SERVICES: Array<any> = [
  AuthenticationService,
  UserService,
  UrlManagerService,
  TokenService,
  PaginationService,
  SortService,
  ReportService,
  FileService
];
