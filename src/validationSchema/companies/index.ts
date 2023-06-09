import * as yup from 'yup';
import { articleValidationSchema } from 'validationSchema/articles';
import { gardenValidationSchema } from 'validationSchema/gardens';
import { videoValidationSchema } from 'validationSchema/videos';

export const companyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  article: yup.array().of(articleValidationSchema),
  garden: yup.array().of(gardenValidationSchema),
  video: yup.array().of(videoValidationSchema),
});
