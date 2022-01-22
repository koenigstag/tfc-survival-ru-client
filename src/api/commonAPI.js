import clientApi from 'api';
import axios from 'axios';
import constants from '../constants';

export const getServerInfo = async () => {
  const response = await axios.get(constants.SERVER_PING_URL);
  
  return response.data;
}

export const getServerInfoV2 = async () => {
  const response = await axios.get('https://api.mcsrvstat.us/2/tfc-survival.ru');
  
  return response.data;
}

export const getMapHtml = async () => {
  const response = await clientApi.get('/map');

  return response.data;
}

export const getVKNews = async () => {
  const response = await clientApi.get('/vknews');
  
  return response.data;
}
