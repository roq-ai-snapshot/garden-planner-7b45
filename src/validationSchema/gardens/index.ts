import * as yup from 'yup';
import { plantValidationSchema } from 'validationSchema/plants';

export const gardenValidationSchema = yup.object().shape({
  size: yup.number().integer().required(),
  soil_type: yup.string().required(),
  sun_exposure: yup.string().required(),
  company_id: yup.string().nullable().required(),
  plant: yup.array().of(plantValidationSchema),
});
