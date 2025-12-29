export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  price: number;
  address: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parkingSpots: number;
  images: string[];
  description: string;
  features: string[];
  isForRent: boolean;
  views: number;
  createdAt: string;
  agentId: string;
  agentName: string;
  agentPhone: string;
  status: 'available' | 'sold' | 'rented' | 'pending';
}

export interface RealEstateAgency {
  id: string;
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  creci: string;
  propertiesCount: number;
  agentsCount: number;
  monthlyRevenue: number;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'saas_admin' | 'agency_manager' | 'secretary' | 'agent';
  agencyId?: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalAgencies: number;
  activeAgencies: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalProperties: number;
  totalUsers: number;
}
