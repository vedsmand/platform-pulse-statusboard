
import React, { useState } from 'react';
import { Incident, formatDate } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Timeline from './Timeline';

interface IncidentHistoryProps {
  incidents: Incident[];
  className?: string;
}

const IncidentHistory: React.FC<IncidentHistoryProps> = ({ incidents, className = '' }) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-status-outage text-white';
      case 'major':
        return 'bg-status-degraded text-white';
      case 'minor':
        return 'bg-status-maintenance text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-status-operational text-white';
      case 'monitoring':
        return 'bg-status-maintenance text-white';
      case 'identified':
      case 'investigating':
        return 'bg-status-degraded text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className={`${className}`}>
      <h2 className="text-xl font-semibold mb-4">Incident History</h2>
      
      <div className="space-y-4">
        {incidents.map(incident => (
          <div 
            key={incident.id} 
            className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedIncident(incident)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{incident.title}</h3>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityClass(incident.severity)}`}>
                  {incident.severity}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <p>Started: {formatDate(incident.createdAt)}</p>
              <p>Last update: {formatDate(incident.updatedAt)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedIncident} onOpenChange={(open) => !open && setSelectedIncident(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Incident Details</DialogTitle>
          </DialogHeader>
          {selectedIncident && <Timeline incident={selectedIncident} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncidentHistory;
