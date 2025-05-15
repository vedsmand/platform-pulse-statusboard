
import React from 'react';
import { ServiceStatus } from '../data/mockData';
import StatusBadge from './StatusBadge';

interface StatusCardProps {
  service: ServiceStatus;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ service, className = '' }) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{service.name}</h3>
          <p className="text-xs text-gray-500">{service.description}</p>
        </div>
        <StatusBadge status={service.status} showText={true} />
      </div>
    </div>
  );
};

export default StatusCard;
