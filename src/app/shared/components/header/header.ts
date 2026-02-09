import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  template: `
    <header
      class="w-full border-b border-border-light bg-base-alt/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h1 class="text-lg font-semibold text-content tracking-tight leading-tight">
            GitHub Deep Audit
          </h1>
          <p class="text-xs text-content-muted">AI-Powered Repository Security Analysis</p>
        </div>

        <!-- Theme Toggle -->
        <button
          (click)="themeService.toggle()"
          class="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-surface-hover"
          [attr.aria-label]="themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          @if (themeService.theme() === 'dark') {
            <!-- Sun icon -->
            <svg class="w-5 h-5 text-content-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          } @else {
            <!-- Moon icon -->
            <svg class="w-5 h-5 text-content-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          }
        </button>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly themeService = inject(ThemeService);
}
