//have to change the file name after simran pushes the code
// pages/api/fetchSellerProfile.js

import axios from 'axios';

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    url: 'https://real-time-amazon-data.p.rapidapi.com/seller-profile',
    params: {
      seller_id: 'A02211013Q5HP3OMSZC7W',
      country: 'US'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Use environment variable for security
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: 'Error fetching data' });
  }
}
