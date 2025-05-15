
import React from 'react';
import { Incident, getIncidentStatusText, formatDate } from '../data/mockData';

interface TimelineProps {
  incident: Incident;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ incident, className = '' }) => {
  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-medium mb-4">{incident.title}</h3>
      
      <div className="flow-root">
        <ul className="-mb-8">
          {incident.updates.map((update, idx) => {
            const isLast = idx === incident.updates.length - 1;
            
            return (
              <li key={idx}>
                <div className="relative pb-8">
                  {!isLast && (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                        <span className="text-sm text-gray-500">
                          {/* Simple emoji for update status */}
                          {update.status === 'resolved' ? '✅' : 
                           update.status === 'monitoring' ? '🔍' : 
                           update.status === 'identified' ? '🔎' : '🚨'}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-gray-500">
                        <div className="font-medium text-gray-900">
                          {getIncidentStatusText(update.status)}
                        </div>
                        <p className="mt-0.5">{formatDate(update.timestamp)}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{update.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
