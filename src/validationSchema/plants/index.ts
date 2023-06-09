import * as yup from 'yup';

export const plantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  planting_date: yup.date().required(),
  fertilizer_type: yup.string(),
  water_amount: yup.number().integer(),
  garden_id: yup.string().nullable().required(),
});
