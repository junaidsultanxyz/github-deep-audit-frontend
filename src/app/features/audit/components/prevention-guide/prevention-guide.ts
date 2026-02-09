import { Component, input } from '@angular/core';
import { PreventionGuide as PreventionGuideModel } from '../../../../core/models/audit.models';

@Component({
  selector: 'app-prevention-guide',
  templateUrl: './prevention-guide.html',
})
export class PreventionGuide {
  readonly guide = input.required<PreventionGuideModel>();
}
