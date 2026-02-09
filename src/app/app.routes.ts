import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/audit/audit-page').then((m) => m.AuditPage),
  },
];
