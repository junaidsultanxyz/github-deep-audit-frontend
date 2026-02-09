import { Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-form',
  imports: [FormsModule],
  templateUrl: './audit-form.html',
})
export class AuditForm {
  readonly submitAudit = output<{ repoUrl: string; projectDescription: string }>();

  protected readonly repoUrl = signal('');
  protected readonly projectDescription = signal('');

  private readonly githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/;

  protected readonly isValidUrl = computed(() =>
    this.githubUrlPattern.test(this.repoUrl().trim()),
  );

  protected readonly canSubmit = computed(() => this.isValidUrl());

  protected onSubmit(): void {
    if (!this.canSubmit()) return;
    this.submitAudit.emit({
      repoUrl: this.repoUrl().trim(),
      projectDescription: this.projectDescription().trim(),
    });
  }
}
