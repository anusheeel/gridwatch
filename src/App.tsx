import {React, useState} from 'react';
import { Header } from './components/Header';
import { StatusCard } from './components/Dashboard/StatusCard';
import { AlertsList } from './components/Dashboard/AlertsList';
import MapContainer from './components/Map/MapContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWebSocketData } from './hooks/useWebSocketData';
import { useSubstations } from './hooks/useSubstations';
import './index.css'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const mockAlerts = [
  {
    id: '1',
    type: 'critical' as const,
    message: 'High voltage detected at Substation Alpha',
    timestamp: new Date().toISOString(),
    substation: 'Alpha',
    acknowledged: false,
  },
  {
    id: '2',
    type: 'warning' as const,
    message: 'Transformer temperature above normal',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    substation: 'Beta',
    acknowledged: false,
  },
];

const AppContent = () => {
  useWebSocketData();
  const { data: substations = [] } = useSubstations();
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<Record<string, any>>({});

  const handleAcknowledgeAlert = (id: string) => {
    console.log('Acknowledging alert:', id);
  };
   // Receive sensor data from WebSocket
   const handleSensorDataUpdate = (data: Record<string, any>) => {
    setSensorData(data);
  };

  const handleSubstationSelect = (substationName: string) => {
    setSelectedSensor(substationName);
  };

  const selectedSensorData = selectedSensor ? sensorData[selectedSensor] : null;

 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <h3>{selectedSensorData ? selectedSensorData.name : "NA"}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard title="System Voltage" value={selectedSensorData ? `${selectedSensorData.voltage.toFixed(2)} kV` : "N/A"} status={selectedSensorData ? (selectedSensorData.voltage > 125 ? "warning" : "normal") : "normal"} trend="stable" />
          <StatusCard title="Power Factor" value={selectedSensorData ? selectedSensorData.powerFactor.toFixed(2) : "N/A"} status={selectedSensorData ? (selectedSensorData.powerFactor < 0.95 ? "warning" : "normal") : "normal"} trend="down" />
          <StatusCard title="Frequency" value={selectedSensorData ? `${selectedSensorData.frequency.toFixed(2)} Hz` : "N/A"} status={selectedSensorData ? (Math.abs(selectedSensorData.frequency - 50) > 0.5 ? "warning" : "normal") : "normal"} trend="stable" />
          <StatusCard title="Transformer Load" value={selectedSensorData ? `${((selectedSensorData.current / 150) * 100).toFixed(0)}%` : "N/A"} status={selectedSensorData ? (selectedSensorData.current > 130 ? "warning" : "normal") : "normal"}trend="up" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapContainer 
            substations={substations} 
            onSubstationSelect={handleSubstationSelect}
            onSensorDataUpdate={handleSensorDataUpdate}
            />
          </div>
          <div>
            <AlertsList alerts={mockAlerts} onAcknowledge={handleAcknowledgeAlert} />
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;