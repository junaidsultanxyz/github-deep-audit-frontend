import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-score-gauge',
  templateUrl: './score-gauge.html',
})
export class ScoreGauge {
  readonly score = input.required<number>();
  readonly size = input<number>(160);

  protected readonly radius = computed(() => (this.size() - 20) / 2);
  protected readonly circumference = computed(() => 2 * Math.PI * this.radius());
  protected readonly dashOffset = computed(
    () => this.circumference() - (this.score() / 100) * this.circumference(),
  );

  protected readonly strokeColorHex = computed(() => {
    const s = this.score();
    if (s >= 80) return 'var(--color-success)';
    if (s >= 60) return 'var(--color-medium)';
    if (s >= 40) return 'var(--color-high)';
    return 'var(--color-critical)';
  });

  protected readonly textColorClass = computed(() => {
    const s = this.score();
    if (s >= 80) return 'text-success';
    if (s >= 60) return 'text-medium';
    if (s >= 40) return 'text-high';
    return 'text-critical';
  });

  protected readonly scoreLabel = computed(() => {
    const s = this.score();
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Poor';
  });
}
