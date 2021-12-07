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
