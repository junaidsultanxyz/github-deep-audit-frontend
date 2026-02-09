import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-audit-error',
  templateUrl: './audit-error.html',
})
export class AuditError {
  readonly message = input.required<string>();
  readonly reset = output<void>();
}
