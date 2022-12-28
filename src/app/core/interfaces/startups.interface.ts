import { Sectors } from './sector.interface';

export interface Startup {
  key?:string;
  name: string;
  logo?: string;
  city?: string;
  sectors: [];
  numberOfEmployees?: number|null;
  yearOfEstablish?: string;
  websiteUrl: string;
  emailAddress: string;
}
