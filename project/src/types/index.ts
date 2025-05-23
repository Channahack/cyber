export type UserRole = 'admin' | 'analyst' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed' | 'rejected';
export type IncidentType = 
  | 'malware' 
  | 'phishing' 
  | 'data_breach' 
  | 'ddos' 
  | 'unauthorized_access'
  | 'ransomware'
  | 'social_engineering'
  | 'other';

export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedBy: string; // User ID
  reportedAt: string; // ISO date string
  assignedTo?: string; // Analyst ID
  assignedAt?: string; // ISO date string
  resolvedAt?: string; // ISO date string
  affectedSystems: string[];
  notes: IncidentNote[];
}

export interface IncidentNote {
  id: string;
  content: string;
  createdBy: string; // User ID
  createdAt: string; // ISO date string
}

export interface DashboardStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  rejected: number;
  byType: Record<IncidentType, number>;
  bySeverity: Record<IncidentSeverity, number>;
}