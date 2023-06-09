import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  title: string;
  url: string;
  company_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  company?: CompanyInterface;
  _count?: {};
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  url?: string;
  company_id?: string;
}
