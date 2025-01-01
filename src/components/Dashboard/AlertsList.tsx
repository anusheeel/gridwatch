import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Alert } from '../../types/monitoring';
import { formatDistanceToNow } from 'date-fns';

interface AlertsListProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

export function AlertsList({ alerts, onAcknowledge }: AlertsListProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
      </div>
      <div className="divide-y">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 flex items-start space-x-4">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <p className="font-medium">{alert.message}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </p>
              {alert.substation && (
                <p className="text-sm text-gray-600">Substation: {alert.substation}</p>
              )}
            </div>
            {!alert.acknowledged && (
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-full hover:bg-green-100"
              >
                Acknowledge
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}