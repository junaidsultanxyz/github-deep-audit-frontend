import { Component, input } from '@angular/core';
import { ArchitectureReview as ArchitectureReviewModel } from '../../../../core/models/audit.models';

@Component({
  selector: 'app-architecture-review',
  templateUrl: './architecture-review.html',
})
export class ArchitectureReview {
  readonly review = input.required<ArchitectureReviewModel>();
}
