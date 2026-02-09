// ─── Request ───

export interface AuditRequest {
  repoUrl: string;
  projectDescription?: string;
}

// ─── Job Response ───

export interface AuditJobResponse {
  jobId: string;
  status: AuditStatus;
  message: string;
  report: AuditReport | null;
}

export type AuditStatus =
  | 'QUEUED'
  | 'CLONING'
  | 'READING'
  | 'VALIDATING_DESCRIPTION'
  | 'AUDITING'
  | 'VALIDATING_STRUCTURE'
  | 'COMPLETED'
  | 'FAILED';

// ─── Audit Report ───

export interface AuditReport {
  repositoryUrl: string;
  auditTimestamp: string;
  projectSummary: string;
  overallScore: number;
  issueSummary: IssueSummary;
  issues: AuditIssue[];
  architectureReview: ArchitectureReview;
  preventionGuide: PreventionGuide;
}

export interface IssueSummary {
  totalIssues: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface AuditIssue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  filePath: string;
  lineNumbers: string;
  codeSnippet: string;
  recommendation: string;
  impact: string;
}

export type IssueCategory =
  | 'SECURITY'
  | 'VULNERABILITY'
  | 'API_LEAK'
  | 'BACKDOOR'
  | 'ERROR'
  | 'WARNING'
  | 'ARCHITECTURE'
  | 'PERFORMANCE'
  | 'CODE_QUALITY'
  | 'BEST_PRACTICE';

export type IssueSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface ArchitectureReview {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export interface PreventionGuide {
  summary: string;
  recommendations: string[];
}
