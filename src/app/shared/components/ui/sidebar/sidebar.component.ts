import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() closeEmmit = new EventEmitter<boolean>();
  @Output() logoutEmmit = new EventEmitter<never>();

  closeSidebar(close: boolean) {
    this.closeEmmit.emit(close);
  }
  logout() {
    this.logoutEmmit.emit();
  }
}
