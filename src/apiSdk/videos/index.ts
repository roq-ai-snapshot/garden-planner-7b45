import axios from 'axios';
import queryString from 'query-string';
import { VideoInterface, VideoGetQueryInterface } from 'interfaces/video';
import { GetQueryInterface } from '../../interfaces';

export const getVideos = async (query?: VideoGetQueryInterface) => {
  const response = await axios.get(`/api/videos${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVideo = async (video: VideoInterface) => {
  const response = await axios.post('/api/videos', video);
  return response.data;
};

export const updateVideoById = async (id: string, video: VideoInterface) => {
  const response = await axios.put(`/api/videos/${id}`, video);
  return response.data;
};

export const getVideoById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/videos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVideoById = async (id: string) => {
  const response = await axios.delete(`/api/videos/${id}`);
  return response.data;
};
