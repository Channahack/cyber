import { Incident, IncidentNote, DashboardStats, User } from '../types';

// Mock analysts
export const mockAnalysts: User[] = [
  {
    id: '2',
    name: 'Sophia Chen',
    email: 'analyst@cirms.com',
    role: 'analyst',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Michael Johnson',
    email: 'michael@cirms.com',
    role: 'analyst',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@cirms.com',
    role: 'analyst',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

// Mock incidents
export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Phishing Email Campaign',
    description: 'Multiple employees received suspicious emails claiming to be from IT requesting password resets.',
    type: 'phishing',
    severity: 'high',
    status: 'in_progress',
    reportedBy: '3',
    reportedAt: '2023-05-10T08:30:00.000Z',
    assignedTo: '2',
    assignedAt: '2023-05-10T09:15:00.000Z',
    affectedSystems: ['Email', 'Employee Workstations'],
    notes: [
      {
        id: '1-1',
        content: 'Initial investigation shows emails originated from a spoofed domain.',
        createdBy: '2',
        createdAt: '2023-05-10T10:00:00.000Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Unauthorized Login Attempt',
    description: 'Multiple failed login attempts detected on the admin portal from unknown IP addresses.',
    type: 'unauthorized_access',
    severity: 'critical',
    status: 'open',
    reportedBy: '3',
    reportedAt: '2023-05-12T14:20:00.000Z',
    affectedSystems: ['Admin Portal', 'Authentication System'],
    notes: []
  },
  {
    id: '3',
    title: 'Ransomware Detection',
    description: 'Antivirus detected potential ransomware on marketing department computer.',
    type: 'ransomware',
    severity: 'critical',
    status: 'resolved',
    reportedBy: '3',
    reportedAt: '2023-05-08T11:45:00.000Z',
    assignedTo: '4',
    assignedAt: '2023-05-08T12:00:00.000Z',
    resolvedAt: '2023-05-09T16:30:00.000Z',
    affectedSystems: ['Marketing Workstation', 'File Server'],
    notes: [
      {
        id: '3-1',
        content: 'Isolated affected system and restored from backup.',
        createdBy: '4',
        createdAt: '2023-05-09T14:00:00.000Z'
      },
      {
        id: '3-2',
        content: 'Performed full system scan on connected systems. No further infections detected.',
        createdBy: '4',
        createdAt: '2023-05-09T16:00:00.000Z'
      }
    ]
  },
  {
    id: '4',
    title: 'Suspicious Network Traffic',
    description: 'Unusual outbound traffic detected from finance department.',
    type: 'data_breach',
    severity: 'medium',
    status: 'assigned',
    reportedBy: '1',
    reportedAt: '2023-05-14T09:10:00.000Z',
    assignedTo: '5',
    assignedAt: '2023-05-14T10:05:00.000Z',
    affectedSystems: ['Finance Workstations', 'Network'],
    notes: []
  },
  {
    id: '5',
    title: 'DDoS Attack on Public Website',
    description: 'Company website experiencing slowdowns due to unusual traffic patterns.',
    type: 'ddos',
    severity: 'high',
    status: 'in_progress',
    reportedBy: '3',
    reportedAt: '2023-05-15T16:40:00.000Z',
    assignedTo: '2',
    assignedAt: '2023-05-15T16:55:00.000Z',
    affectedSystems: ['Public Website', 'Web Servers'],
    notes: [
      {
        id: '5-1',
        content: 'Enabled DDoS protection through CDN. Monitoring traffic patterns.',
        createdBy: '2',
        createdAt: '2023-05-15T17:30:00.000Z'
      }
    ]
  },
  {
    id: '6',
    title: 'Malware on Development Server',
    description: 'Suspicious processes detected on development server with unusual CPU usage.',
    type: 'malware',
    severity: 'medium',
    status: 'closed',
    reportedBy: '3',
    reportedAt: '2023-05-05T13:20:00.000Z',
    assignedTo: '4',
    assignedAt: '2023-05-05T14:00:00.000Z',
    resolvedAt: '2023-05-06T11:45:00.000Z',
    affectedSystems: ['Development Server'],
    notes: [
      {
        id: '6-1',
        content: 'Identified cryptocurrency mining malware. Removed and patched system.',
        createdBy: '4',
        createdAt: '2023-05-06T10:30:00.000Z'
      }
    ]
  },
  {
    id: '7',
    title: 'Potential Data Leak',
    description: 'Customer reported finding company data on public forum.',
    type: 'data_breach',
    severity: 'high',
    status: 'open',
    reportedBy: '3',
    reportedAt: '2023-05-16T08:50:00.000Z',
    affectedSystems: ['Customer Database', 'CRM System'],
    notes: []
  }
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  total: mockIncidents.length,
  open: mockIncidents.filter(i => i.status === 'open').length,
  inProgress: mockIncidents.filter(i => i.status === 'in_progress').length,
  resolved: mockIncidents.filter(i => i.status === 'resolved').length,
  closed: mockIncidents.filter(i => i.status === 'closed').length,
  rejected: mockIncidents.filter(i => i.status === 'rejected').length,
  byType: {
    malware: mockIncidents.filter(i => i.type === 'malware').length,
    phishing: mockIncidents.filter(i => i.type === 'phishing').length,
    data_breach: mockIncidents.filter(i => i.type === 'data_breach').length,
    ddos: mockIncidents.filter(i => i.type === 'ddos').length,
    unauthorized_access: mockIncidents.filter(i => i.type === 'unauthorized_access').length,
    ransomware: mockIncidents.filter(i => i.type === 'ransomware').length,
    social_engineering: mockIncidents.filter(i => i.type === 'social_engineering').length,
    other: mockIncidents.filter(i => i.type === 'other').length,
  },
  bySeverity: {
    low: mockIncidents.filter(i => i.severity === 'low').length,
    medium: mockIncidents.filter(i => i.severity === 'medium').length,
    high: mockIncidents.filter(i => i.severity === 'high').length,
    critical: mockIncidents.filter(i => i.severity === 'critical').length,
  }
};

export const getIncidentsForUser = (userId: string) => {
  return mockIncidents.filter(incident => incident.reportedBy === userId);
};

export const getIncidentsForAnalyst = (analystId: string) => {
  return mockIncidents.filter(incident => incident.assignedTo === analystId);
};

export const getIncidentById = (incidentId: string) => {
  return mockIncidents.find(incident => incident.id === incidentId);
};