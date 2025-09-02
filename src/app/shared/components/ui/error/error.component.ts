import { Component,Input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
 @Input() errorMessages:string[]=[];

}
