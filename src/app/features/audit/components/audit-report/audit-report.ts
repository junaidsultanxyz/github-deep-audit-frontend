import { Component, computed, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, DatePipe, TitleCasePipe } from '@angular/common';

import { AuditReport as AuditReportModel, IssueSeverity } from '../../../../core/models/audit.models';
import { ScoreGauge } from '../score-gauge/score-gauge';
import { IssueCard } from '../issue-card/issue-card';
import { ArchitectureReview } from '../architecture-review/architecture-review';
import { PreventionGuide } from '../prevention-guide/prevention-guide';

type SeverityFilter = IssueSeverity | 'ALL';

@Component({
  selector: 'app-audit-report',
  imports: [ScoreGauge, IssueCard, ArchitectureReview, PreventionGuide, DatePipe, TitleCasePipe],
  templateUrl: './audit-report.html',
  styleUrl: './audit-report.css',
})
export class AuditReportComponent {
  readonly report = input.required<AuditReportModel>();

  private readonly platformId = inject(PLATFORM_ID);

  protected readonly activeSeverityFilter = signal<SeverityFilter>('ALL');

  protected readonly severityFilters: SeverityFilter[] = [
    'ALL',
    'CRITICAL',
    'HIGH',
    'MEDIUM',
    'LOW',
  ];

  protected readonly filteredIssues = computed(() => {
    const filter = this.activeSeverityFilter();
    const issues = this.report().issues;
    if (filter === 'ALL') return issues;
    return issues.filter((i) => i.severity === filter);
  });

  protected setFilter(filter: SeverityFilter): void {
    this.activeSeverityFilter.set(filter);
  }

  protected downloadPdf(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.print();
  }
}
