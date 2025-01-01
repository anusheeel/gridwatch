import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import cors from 'cors';
import axios from 'axios';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

let lastFetchTime = 0;
const FETCH_INTERVAL = 30 * 1000; // Reduced to 30 seconds for testing

const broadcastData = (data: any) => {
  const clients = Array.from(wss.clients).filter(client => client.readyState === 1);
  console.log(`Broadcasting to ${clients.length} clients`);
  
  if (clients.length > 0) {
    const message = {
      type: 'SENSOR_UPDATE',
      payload: data.map((sensor: any) => ({
        name: sensor.name.replace('Sensor ', ''),  // Remove "Sensor " prefix to match map markers
        voltage: sensor.voltage,
        current: sensor.current,
        powerFactor: sensor.powerFactor,
        frequency: sensor.frequency,
        lastUpdated: sensor.lastUpdated
      }))
    };
    
    clients.forEach(client => {
      try {
        client.send(JSON.stringify(message));
        console.log('Data sent successfully to client');
      } catch (error) {
        console.error('Error sending to client:', error);
      }
    });
  }
};

const fetchAndProcessData = async () => {
  try {
    console.log('Fetching sensor data...');
    const response = await axios.get('http://localhost:3002/sensor-data');
    const sensorData = response.data;
    
    if (Array.isArray(sensorData) && sensorData.length > 0) {
      console.log(`Received ${sensorData.length} sensor readings`);
      broadcastData(sensorData);
      lastFetchTime = Date.now();
      console.log('Data broadcasted:', new Date().toISOString());
    } else {
      console.error('Invalid sensor data received');
    }
  } catch (error) {
    console.error('Error fetching sensor data:', error);
  }
};

// Initial fetch
fetchAndProcessData();

// Regular polling
setInterval(fetchAndProcessData, FETCH_INTERVAL);

wss.on('connection', async (ws) => {
  console.log('Client connected');
  
  // Send initial data to newly connected client
  await fetchAndProcessData();
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server running on port 8080');
});

app.listen(3001, () => {
  console.log('HTTP server running on port 3001');
});