import axios from 'axios';
import queryString from 'query-string';
import { GardenInterface, GardenGetQueryInterface } from 'interfaces/garden';
import { GetQueryInterface } from '../../interfaces';

export const getGardens = async (query?: GardenGetQueryInterface) => {
  const response = await axios.get(`/api/gardens${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGarden = async (garden: GardenInterface) => {
  const response = await axios.post('/api/gardens', garden);
  return response.data;
};

export const updateGardenById = async (id: string, garden: GardenInterface) => {
  const response = await axios.put(`/api/gardens/${id}`, garden);
  return response.data;
};

export const getGardenById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gardens/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGardenById = async (id: string) => {
  const response = await axios.delete(`/api/gardens/${id}`);
  return response.data;
};
