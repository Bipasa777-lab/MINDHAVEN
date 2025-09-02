// types/analytics.d.ts

export interface AnalyticsEvent {
  id?: string;
  name: string;
  userId?: string;
  timestamp: string; // ISO format
  metadata?: Record<string, any>;
}

export interface AnalyticsSummary {
  totalUsers: number;
  activeUsers: number;
  eventsTracked: number;
}
