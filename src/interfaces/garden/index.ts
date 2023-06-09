import { PlantInterface } from 'interfaces/plant';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface GardenInterface {
  id?: string;
  size: number;
  soil_type: string;
  sun_exposure: string;
  company_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  plant?: PlantInterface[];
  company?: CompanyInterface;
  _count?: {
    plant?: number;
  };
}

export interface GardenGetQueryInterface extends GetQueryInterface {
  id?: string;
  soil_type?: string;
  sun_exposure?: string;
  company_id?: string;
}
