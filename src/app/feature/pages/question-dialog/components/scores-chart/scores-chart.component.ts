import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../shared/components/ui/primary-button/primary-button.component';

@Component({
  selector: 'app-scores-chart',
  imports: [PrimaryButtonComponent],
  templateUrl: './scores-chart.component.html',
  styleUrl: './scores-chart.component.scss',
})
export class ScoresChartComponent {
  closeDialog() {}
  ShowResults() {}
}
