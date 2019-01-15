import { Injectable } from '@angular/core';

interface IApiConfig {
  domain: string;
  protocol?: string;
}

@Injectable()
export class UrlManagerService {
  baseUrl: string;

  auth = {
    login: () => this.url(`/auth/login`),
    logout: () => this.url(`/auth/logout`),
  };

  user = {
    getCurrentUser: () => this.url(`/users/me`),
    find: (param) => this.url(`/users/${param}`),
    create: () => this.url(`/users/`),
    update: (id) => this.url(`/users/${id}`),
    delete: (id) => this.url(`/users/${id}`),
    search: () => this.url(`/users/`),
  };

  report = {
    find: (param) => this.url(`/report/${param}`),
    create: () => this.url(`/report/`),
    update: (id) => this.url(`/report/${id}`),
    delete: (id) => this.url(`/report/${id}`),
    search: () => this.url(`/report/`),
  };

  file = {
    batchContents: () => this.url('/file/import')
  };

  constructor() {
    const ApiMetadata: IApiConfig =  (JSON.parse(JSON.stringify(process.env.API_METADATA)) as IApiConfig);
    const protocol: string = ApiMetadata.protocol || '//';
    this.baseUrl = protocol +  ApiMetadata.domain;
  }

  url = (path) => this.baseUrl + path;
}
