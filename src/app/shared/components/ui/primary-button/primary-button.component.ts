import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-primary-button',
  imports: [ButtonModule],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  @Input({ required: true }) labelText: string = '';
  @Input({ required: false }) disabled: boolean = false;
  @Input({ required: false }) type: string = 'submit';
  @Input({ required: false }) loading: boolean = false;
}
