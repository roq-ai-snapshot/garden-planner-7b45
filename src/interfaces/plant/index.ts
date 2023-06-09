import { GardenInterface } from 'interfaces/garden';
import { GetQueryInterface } from 'interfaces';

export interface PlantInterface {
  id?: string;
  name: string;
  planting_date: Date | string;
  fertilizer_type?: string;
  water_amount?: number;
  garden_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  garden?: GardenInterface;
  _count?: {};
}

export interface PlantGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  fertilizer_type?: string;
  garden_id?: string;
}
