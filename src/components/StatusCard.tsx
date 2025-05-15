
import React, { useState } from 'react';
import { ServiceStatus } from '../data/mockData';
import StatusBadge from './StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface StatusCardProps {
  service: ServiceStatus;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ service, className = '' }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Mock historic SLA data - in a real application, this would come from an API
  const historicSLA = [
    { period: 'May 2025', availability: '99.98%', responseTime: '210ms' },
    { period: 'April 2025', availability: '99.95%', responseTime: '230ms' },
    { period: 'March 2025', availability: '99.92%', responseTime: '250ms' },
    { period: 'February 2025', availability: '99.90%', responseTime: '270ms' },
    { period: 'January 2025', availability: '99.85%', responseTime: '290ms' },
  ];

  return (
    <>
      <div 
        className={`p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer ${className}`}
        onClick={() => setShowDetails(true)}
      >
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

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {service.name} 
              <StatusBadge status={service.status} size="sm" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Service Information</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-600 mt-1">Category: {service.category}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Current SLA</h4>
              {service.sla ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs font-medium text-gray-600">Availability</p>
                    <p className="text-lg font-semibold">{service.sla.availability}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs font-medium text-gray-600">Response Time</p>
                    <p className="text-lg font-semibold">{service.sla.responseTime}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No SLA defined for this service</p>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Historic SLA Performance</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {historicSLA.map((period, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 text-sm text-gray-900">{period.period}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{period.availability}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{period.responseTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowDetails(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusCard;
