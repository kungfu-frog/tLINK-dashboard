import axios from 'axios';

const API_KEY = '56ee55324f7b0658b0afc4debae83ff1';
const API_URL = 'https://financialmodelingprep.com/api/v3';

const getTslaPrice = async () => {
  const response = await axios({
    url: `${API_URL}/quote-short/TSLA?apikey=${API_KEY}`,
    method: 'GET',
  });
  return response.data[0].price;
};

export default {
  getTslaPrice,
};
