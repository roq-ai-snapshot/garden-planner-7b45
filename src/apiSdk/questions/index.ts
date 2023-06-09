import axios from 'axios';
import queryString from 'query-string';
import { QuestionInterface, QuestionGetQueryInterface } from 'interfaces/question';
import { GetQueryInterface } from '../../interfaces';

export const getQuestions = async (query?: QuestionGetQueryInterface) => {
  const response = await axios.get(`/api/questions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createQuestion = async (question: QuestionInterface) => {
  const response = await axios.post('/api/questions', question);
  return response.data;
};

export const updateQuestionById = async (id: string, question: QuestionInterface) => {
  const response = await axios.put(`/api/questions/${id}`, question);
  return response.data;
};

export const getQuestionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/questions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteQuestionById = async (id: string) => {
  const response = await axios.delete(`/api/questions/${id}`);
  return response.data;
};
