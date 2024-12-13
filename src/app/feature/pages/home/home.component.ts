import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';



import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { QuizesComponent } from "../quizes/quizes.component";
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule, MenubarModule, BadgeModule, QuizesComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U'
                },
                {
                    separator: true
                },
               
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: '3'
        }
    ];
}
}
