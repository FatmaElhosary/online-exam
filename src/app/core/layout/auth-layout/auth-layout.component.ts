import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

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
    ButtonModule,
    ImageModule,
    SelectModule,
    DividerModule,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  languages: Language[] = [
    { id: '1', language: 'English' },
    { id: '2', language: 'Arabic' },
  ];
  selectedLang: Language | undefined = this.languages[0];

  ngOnInit() {}
}
