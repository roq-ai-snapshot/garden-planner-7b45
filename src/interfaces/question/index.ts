import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface QuestionInterface {
  id?: string;
  content: string;
  answer?: string;
  user_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  user?: UserInterface;
  _count?: {};
}

export interface QuestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  answer?: string;
  user_id?: string;
}
