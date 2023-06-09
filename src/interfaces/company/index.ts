import { ArticleInterface } from 'interfaces/article';
import { GardenInterface } from 'interfaces/garden';
import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id: string;
  tenant_id: string;
  article?: ArticleInterface[];
  garden?: GardenInterface[];
  video?: VideoInterface[];
  user?: UserInterface;
  _count?: {
    article?: number;
    garden?: number;
    video?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  tenant_id?: string;
}
