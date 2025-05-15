
import React from 'react';
import { 
  mockStatusData, 
  getOverallStatusText,
  getStatusEmoji,
  groupServicesByCategory,
} from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import StatusCard from '../components/StatusCard';
import IncidentHistory from '../components/IncidentHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { services, incidents, lastUpdated, overallStatus } = mockStatusData;
  const groupedServices = groupServicesByCategory(services);
  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  
  // Format the last updated time
  const formattedLastUpdated = new Date(lastUpdated).toLocaleString();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">
              Internal Developer Platform Status
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {formattedLastUpdated}
            </p>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Overall status */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <StatusBadge status={overallStatus} size="lg" />
                <span className="text-lg font-medium">
                  {getOverallStatusText(mockStatusData)}
                </span>
              </div>
              
              {activeIncidents.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-md">
                  <p className="text-sm font-medium text-red-800">
                    {activeIncidents.length} active {activeIncidents.length === 1 ? 'incident' : 'incidents'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Services status */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Services</TabsTrigger>
                {Object.keys(groupedServices).map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map(service => (
                    <StatusCard key={service.id} service={service} />
                  ))}
                </div>
              </TabsContent>
              
              {Object.entries(groupedServices).map(([category, categoryServices]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryServices.map(service => (
                      <StatusCard key={service.id} service={service} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Incidents */}
          <div>
            <IncidentHistory incidents={incidents} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500">
            Internal Developer Platform Status Page
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
