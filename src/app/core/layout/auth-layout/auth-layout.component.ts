import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
interface Language {
  id: string;
  language: string;
}
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ImageModule,
    SelectModule,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  languages: Language[] = [
    { id: '1', language: 'English' },
    { id: '2', language: 'Arabic' },
  ];
  selectedLang: Language | undefined;

  ngOnInit() {}
}
