import express from 'express';
import { createClient } from '@supabase/supabase-js';  // Note the .js extension
import { config } from 'dotenv';
const app = express();
const port = 3002;

config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);
const generateSensorData = async () => {
  try {
    const { data: substations, error } = await supabase
      .from('substations')
      .select('name');

    if (error) {
      console.error('Error:', error);
      return [];
    }

    return substations.map(substation => ({
      name: substation.name,
      voltage: 120 + Math.random() * 10,
      current: 100 + Math.random() * 50,
      powerFactor: 0.9 + Math.random() * 0.1,
      frequency: 50 + (Math.random() - 0.5) * 0.2,
      lastUpdated: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

app.get('/sensor-data', async (req, res) => {
  const sensorData = await generateSensorData();
  console.log('Generated sensor data:', sensorData);
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`Mock sensor API running at http://localhost:${port}/sensor-data`);
});