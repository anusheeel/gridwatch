import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

export function StatusCard({ title, value, status, trend }: StatusCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 border-green-200';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200';
      case 'critical':
        return 'bg-red-100 border-red-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <Activity className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()} transition-all duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {getStatusIcon()}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <span className="ml-2 text-sm">
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
    </div>
  );
}