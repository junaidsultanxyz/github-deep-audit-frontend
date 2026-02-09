import { Component, computed, input, signal } from '@angular/core';
import { AuditIssue } from '../../../../core/models/audit.models';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.html',
})
export class IssueCard {
  readonly issue = input.required<AuditIssue>();

  protected readonly expanded = signal(false);

  protected readonly severityBadgeClass = computed(() => {
    switch (this.issue().severity) {
      case 'CRITICAL':
        return 'bg-critical/10 text-critical border-critical/20';
      case 'HIGH':
        return 'bg-high/10 text-high border-high/20';
      case 'MEDIUM':
        return 'bg-medium/10 text-medium border-medium/20';
      case 'LOW':
        return 'bg-low/10 text-low border-low/20';
    }
  });

  protected readonly severityDotClass = computed(() => {
    switch (this.issue().severity) {
      case 'CRITICAL':
        return 'bg-critical';
      case 'HIGH':
        return 'bg-high';
      case 'MEDIUM':
        return 'bg-medium';
      case 'LOW':
        return 'bg-low';
    }
  });

  protected readonly categoryLabel = computed(() =>
    this.issue().category.replace(/_/g, ' '),
  );

  protected toggle(): void {
    this.expanded.update((v) => !v);
  }
}
