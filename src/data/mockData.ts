
// Define types for our status page data
export type StatusType = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface ServiceStatus {
  id: string;
  name: string;
  status: StatusType;
  description: string;
  category: string;
  sla?: {
    availability: string;
    responseTime: string;
  };
}

export interface Incident {
  id: string;
  title: string;
  affectedServices: string[];
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'critical' | 'major' | 'minor';
  createdAt: string;
  updatedAt: string;
  updates: {
    timestamp: string;
    status: string;
    message: string;
  }[];
}

export interface StatusPageData {
  lastUpdated: string;
  overallStatus: StatusType;
  services: ServiceStatus[];
  incidents: Incident[];
}

// Mock data for development
export const mockStatusData: StatusPageData = {
  lastUpdated: new Date().toISOString(),
  overallStatus: 'degraded',
  services: [
    {
      id: 'datadog',
      name: 'Datadog',
      status: 'operational',
      description: 'Monitoring and analytics platform',
      category: 'Monitoring',
      sla: {
        availability: '99.9%',
        responseTime: '<500ms'
      }
    },
    {
      id: 'gcp-compute',
      name: 'GCP Compute',
      status: 'operational',
      description: 'Google Cloud Platform Compute Engine',
      category: 'Cloud Providers',
      sla: {
        availability: '99.95%',
        responseTime: '<200ms'
      }
    },
    {
      id: 'gcp-storage',
      name: 'GCP Storage',
      status: 'degraded',
      description: 'Google Cloud Platform Storage',
      category: 'Cloud Providers',
      sla: {
        availability: '99.9%',
        responseTime: '<300ms'
      }
    },
    {
      id: 'azure-vm',
      name: 'Azure Virtual Machines',
      status: 'operational',
      description: 'Microsoft Azure Virtual Machines',
      category: 'Cloud Providers',
      sla: {
        availability: '99.99%',
        responseTime: '<250ms'
      }
    },
    {
      id: 'azure-blob',
      name: 'Azure Blob Storage',
      status: 'operational',
      description: 'Microsoft Azure Blob Storage',
      category: 'Cloud Providers',
      sla: {
        availability: '99.9%',
        responseTime: '<400ms'
      }
    },
    {
      id: 'bitbucket',
      name: 'Bitbucket',
      status: 'outage',
      description: 'Bitbucket Git repositories',
      category: 'Source Control',
      sla: {
        availability: '99.5%',
        responseTime: '<800ms'
      }
    },
    {
      id: 'jenkins',
      name: 'Jenkins',
      status: 'operational',
      description: 'Internal Jenkins CI system',
      category: 'CI/CD',
      sla: {
        availability: '99.0%',
        responseTime: '<1000ms'
      }
    },
    {
      id: 'argocd',
      name: 'ArgoCD',
      status: 'operational', 
      description: 'Internal Kubernetes deployment tool',
      category: 'CI/CD',
      sla: {
        availability: '99.5%',
        responseTime: '<600ms'
      }
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes Platform',
      status: 'operational',
      description: 'Internal Kubernetes platform',
      category: 'Platform',
      sla: {
        availability: '99.95%',
        responseTime: '<300ms'
      }
    },
    {
      id: 'prometheus',
      name: 'Prometheus',
      status: 'maintenance',
      description: 'Internal monitoring system',
      category: 'Monitoring',
      sla: {
        availability: '99.5%',
        responseTime: '<700ms'
      }
    }
  ],
  incidents: [
    {
      id: 'inc-001',
      title: 'Bitbucket Outage',
      affectedServices: ['bitbucket'],
      status: 'investigating',
      severity: 'critical',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date().toISOString(),
      updates: [
        {
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'investigating',
          message: 'We are investigating issues with Bitbucket. Users are unable to push or pull code.'
        },
        {
          timestamp: new Date().toISOString(),
          status: 'investigating',
          message: 'The issue has been identified as a database connectivity problem. Our team is working on resolving it.'
        }
      ]
    },
    {
      id: 'inc-002',
      title: 'GCP Storage Degraded Performance',
      affectedServices: ['gcp-storage'],
      status: 'identified',
      severity: 'major',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      updates: [
        {
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'investigating',
          message: 'We are investigating reports of slow performance for GCP Storage operations.'
        },
        {
          timestamp: new Date(Date.now() - 5400000).toISOString(),
          status: 'identified',
          message: 'The issue has been identified as network congestion in us-central1 region.'
        },
        {
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          status: 'identified',
          message: 'GCP team is working to reroute traffic. ETA for resolution is 2 hours.'
        }
      ]
    },
    {
      id: 'inc-003',
      title: 'Prometheus Scheduled Maintenance',
      affectedServices: ['prometheus'],
      status: 'monitoring',
      severity: 'minor',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
      updates: [
        {
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          status: 'scheduled',
          message: 'Scheduled maintenance will be performed on Prometheus to upgrade to version 2.40.0.'
        },
        {
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          status: 'in-progress',
          message: 'Maintenance has begun. Prometheus will be unavailable for approximately 30 minutes.'
        }
      ]
    },
    {
      id: 'inc-004',
      title: 'Jenkins Pipeline Failures',
      affectedServices: ['jenkins'],
      status: 'resolved',
      severity: 'minor',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 151200000).toISOString(),
      updates: [
        {
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          status: 'investigating',
          message: 'We are investigating reports of Jenkins pipeline failures.'
        },
        {
          timestamp: new Date(Date.now() - 165600000).toISOString(),
          status: 'identified',
          message: 'The issue has been identified as a disk space problem on the Jenkins master.'
        },
        {
          timestamp: new Date(Date.now() - 151200000).toISOString(),
          status: 'resolved',
          message: 'The issue has been resolved by cleaning up old build artifacts.'
        }
      ]
    }
  ]
};

// Utility functions
export const getStatusEmoji = (status: StatusType): string => {
  switch (status) {
    case 'operational':
      return '✅';
    case 'degraded':
      return '⚠️';
    case 'outage':
      return '❌';
    case 'maintenance':
      return '🔧';
    default:
      return '❓';
  }
};

export const getStatusText = (status: StatusType): string => {
  switch (status) {
    case 'operational':
      return 'Operational';
    case 'degraded':
      return 'Degraded';
    case 'outage':
      return 'Outage';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Unknown';
  }
};

export const getIncidentStatusText = (status: string): string => {
  switch (status) {
    case 'investigating':
      return 'Investigating';
    case 'identified':
      return 'Identified';
    case 'monitoring':
      return 'Monitoring';
    case 'resolved':
      return 'Resolved';
    default:
      return status;
  }
};

export const getOverallStatusText = (data: StatusPageData): string => {
  if (data.services.some(s => s.status === 'outage')) {
    return 'Major System Outage';
  } else if (data.services.some(s => s.status === 'degraded')) {
    return 'Partial System Outage';
  } else if (data.services.some(s => s.status === 'maintenance')) {
    return 'Maintenance In Progress';
  } else {
    return 'All Systems Operational';
  }
};

export const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'operational':
      return 'bg-status-operational';
    case 'degraded':
      return 'bg-status-degraded';
    case 'outage':
      return 'bg-status-outage';
    case 'maintenance':
      return 'bg-status-maintenance';
    default:
      return 'bg-gray-400';
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const groupServicesByCategory = (services: ServiceStatus[]): Record<string, ServiceStatus[]> => {
  return services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceStatus[]>);
};
