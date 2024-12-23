import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { QuizesComponent } from '../quizes/quizes.component';
import { NavbarComponent } from '../../../shared/components/ui/navbar/navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    MenubarModule,
    BadgeModule,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ngOnInit() {}
}
