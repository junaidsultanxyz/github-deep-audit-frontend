import { Component, computed, input } from '@angular/core';
import { AuditStatus } from '../../../../core/models/audit.models';

@Component({
  selector: 'app-audit-loading',
  templateUrl: './audit-loading.html',
})
export class AuditLoading {
  readonly status = input.required<AuditStatus>();
  readonly message = input.required<string>();

  protected readonly stages: AuditStatus[] = [
    'QUEUED',
    'READING',
    'VALIDATING_DESCRIPTION',
    'AUDITING',
    'VALIDATING_STRUCTURE',
  ];

  protected readonly stageLabels: Record<string, string> = {
    QUEUED: 'Queued',
    READING: 'Reading',
    VALIDATING_DESCRIPTION: 'Validating',
    AUDITING: 'Auditing',
    VALIDATING_STRUCTURE: 'Finalizing',
  };

  protected readonly isAuditing = computed(() => this.status() === 'AUDITING');

  protected readonly currentStageIndex = computed(() => this.stages.indexOf(this.status()));

  protected readonly progress = computed(() => {
    const idx = this.currentStageIndex();
    if (idx < 0) return 5;
    return Math.round(((idx + 0.5) / this.stages.length) * 100);
  });

  protected isStageComplete(stage: AuditStatus): boolean {
    return this.stages.indexOf(stage) < this.currentStageIndex();
  }

  protected isStageActive(stage: AuditStatus): boolean {
    return stage === this.status();
  }

  protected stageIndex(stage: AuditStatus): number {
    return this.stages.indexOf(stage);
  }
}
