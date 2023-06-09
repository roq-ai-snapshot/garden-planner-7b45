import * as yup from 'yup';

export const questionValidationSchema = yup.object().shape({
  content: yup.string().required(),
  answer: yup.string(),
  user_id: yup.string().nullable().required(),
});
