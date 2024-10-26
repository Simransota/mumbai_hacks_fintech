import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Step 1: Fetch data from Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('your_table') // Replace with your actual table name
        .select('attribute1, attribute2, attribute3'); // Replace with your actual attribute names

      if (supabaseError) throw supabaseError;

      // Step 2: Send the fetched data to FastAPI
      const fastApiResponse = await axios.post('http://127.0.0.1:8000/process-data/', {
        input: supabaseData, // Pass the data to FastAPI
      });

      // Step 3: Send the prediction back to the frontend
      res.status(200).json({ prediction: fastApiResponse.data.processed_data });
    } catch (error) {
      console.error('Error in API handler:', error);
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
