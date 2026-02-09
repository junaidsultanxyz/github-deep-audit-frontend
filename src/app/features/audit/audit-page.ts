import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Subscription, interval, switchMap, takeWhile, tap } from 'rxjs';

import { AuditService } from '../../core/services/audit.service';
import { AuditReport, AuditStatus } from '../../core/models/audit.models';
import { environment } from '../../core/config/environment';
import { AuditForm } from './components/audit-form/audit-form';
import { AuditLoading } from './components/audit-loading/audit-loading';
import { AuditError } from './components/audit-error/audit-error';
import { AuditReportComponent } from './components/audit-report/audit-report';

type AuditPhase = 'idle' | 'submitting' | 'polling' | 'error' | 'complete';

@Component({
  selector: 'app-audit-page',
  imports: [AuditForm, AuditLoading, AuditError, AuditReportComponent],
  templateUrl: './audit-page.html',
})
export class AuditPage implements OnDestroy {
  private readonly auditService = inject(AuditService);
  private pollingSubscription: Subscription | null = null;

  protected readonly phase = signal<AuditPhase>('idle');
  protected readonly auditStatus = signal<AuditStatus>('QUEUED');
  protected readonly statusMessage = signal('Submitting audit request...');
  protected readonly errorMessage = signal('');
  protected readonly report = signal<AuditReport | null>(null);

  protected onSubmitAudit(data: { repoUrl: string; projectDescription: string }): void {
    this.phase.set('submitting');
    this.auditStatus.set('QUEUED');
    this.statusMessage.set('Submitting audit request...');

    this.auditService
      .startAudit({
        repoUrl: data.repoUrl,
        projectDescription: data.projectDescription || undefined,
      })
      .subscribe({
        next: (response) => {
          this.phase.set('polling');
          this.auditStatus.set(response.status);
          this.statusMessage.set(response.message);
          this.startPolling(response.jobId);
        },
        error: (err: Error) => {
          this.phase.set('error');
          this.errorMessage.set(err.message);
        },
      });
  }

  protected onReset(): void {
    this.stopPolling();
    this.phase.set('idle');
    this.report.set(null);
    this.errorMessage.set('');
    this.statusMessage.set('');
    this.auditStatus.set('QUEUED');
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private startPolling(jobId: string): void {
    this.stopPolling();

    this.pollingSubscription = interval(environment.pollingIntervalMs)
      .pipe(
        switchMap(() => this.auditService.pollAuditStatus(jobId)),
        tap((response) => {
          this.auditStatus.set(response.status);
          this.statusMessage.set(response.message);

          if (response.status === 'FAILED') {
            this.phase.set('error');
            this.errorMessage.set(response.message);
          } else if (response.report) {
            this.report.set(response.report);
            this.phase.set('complete');
          }
        }),
        takeWhile((response) => !response.report && response.status !== 'FAILED'),
      )
      .subscribe({
        error: (err: Error) => {
          this.phase.set('error');
          this.errorMessage.set(err.message);
        },
      });
  }

  private stopPolling(): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = null;
  }
}
