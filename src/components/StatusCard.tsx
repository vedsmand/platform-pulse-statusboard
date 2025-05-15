
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
      
      {service.sla && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600">Availability SLA:</p>
              <p className="text-xs font-semibold">{service.sla.availability}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600">Response Time SLA:</p>
              <p className="text-xs font-semibold">{service.sla.responseTime}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCard;
