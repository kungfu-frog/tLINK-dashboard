import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

const getMemePrice = async () => {
  const response = await axios({
    url: `${API_URL}/simple/price?ids=degenerator&vs_currencies=USD`,
    method: 'GET',
  });
  return response.data.degenerator.usd;
};

export default {
  getMemePrice,
};
