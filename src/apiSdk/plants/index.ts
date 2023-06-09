import axios from 'axios';
import queryString from 'query-string';
import { PlantInterface, PlantGetQueryInterface } from 'interfaces/plant';
import { GetQueryInterface } from '../../interfaces';

export const getPlants = async (query?: PlantGetQueryInterface) => {
  const response = await axios.get(`/api/plants${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlant = async (plant: PlantInterface) => {
  const response = await axios.post('/api/plants', plant);
  return response.data;
};

export const updatePlantById = async (id: string, plant: PlantInterface) => {
  const response = await axios.put(`/api/plants/${id}`, plant);
  return response.data;
};

export const getPlantById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/plants/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlantById = async (id: string) => {
  const response = await axios.delete(`/api/plants/${id}`);
  return response.data;
};
