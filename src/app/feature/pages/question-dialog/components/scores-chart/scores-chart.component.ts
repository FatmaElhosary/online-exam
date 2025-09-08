import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../shared/components/ui/primary-button/primary-button.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-scores-chart',
  imports: [PrimaryButtonComponent, ChartModule],
  templateUrl: './scores-chart.component.html',
  styleUrl: './scores-chart.component.scss',
})
export class ScoresChartComponent implements OnInit {
  data: any;
  options: any;
  constructor(public ref: DynamicDialogRef) {}
  ngOnInit() {
    this.initChart();
  }
  closeDialog() {
    this.ref?.close();
  }
  ShowResults() {}

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    this.data = {
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['#02369C', '#CC1010'],
          hoverOffset: 6,
          borderRadius: 20,
          spacing: 8,
        },
      ],
    };

    this.options = {
      cutout: '85%',
    };
  }
}
