import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialPostContent {
  caption: string;
  hashtags: string[];
}

export interface SocialPost {
  id: string;
  date: string;
  day: string;
  category: string;
  status: string;
  content: SocialPostContent;
  visual_brief: string;
  cta: string;
}

export interface LeadCustomer {
  name: string;
  phone: string;
  address: string;
}

export interface LeadProject {
  type: string;
  urgency: 'low' | 'medium' | 'high';
  notes: string;
}

export interface Lead {
  lead_id: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  source: string;
  customer: LeadCustomer;
  project_details: LeadProject;
}

export interface JobPhoto {
  url: string;
  category: 'before' | 'during' | 'after';
  timestamp: string;
}

export interface Contract {
  id: string;
  clientName: string;
  address: string;
  status: 'active' | 'completed' | 'paid';
  photos: JobPhoto[];
  startDate: string;
}

export interface SafetyRecord {
  id: string;
  contractId: string;
  date: string;
  foreman: string;
  temperature: number;
  windSpeed: number;
  hazards: string[];
  ppe: string[];
  status: 'draft' | 'approved' | 'archived';
}