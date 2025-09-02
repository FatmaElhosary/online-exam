import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Country } from '../../../interfaces/country.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorComponent } from '../error/error.component';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-global-input',
  templateUrl: './globalInput.component.html',
  styleUrls: ['./globalInput.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    PasswordModule,
    ErrorComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlobalInputComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class GlobalInputComponent implements ControlValueAccessor {
  countries: Country[] = [];

  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  //@Input() search = false;
  @Input() value = '';
  @Input() isPhone: boolean = false;

  @Input() isDisabled = false;
  @Input() control!: FormControl;
  @Input() fieldName?: string;
  @Input() selectedCountry: Country = this.countries[0];
  onChange = (val: string) => void 0;
  onTouched = () => void 0;

  writeValue(value: any): void {
    this.value = value ?? '';
    if (this.isPhone && value) {
      this.value = value.replace(`+${this.selectedCountry.dial}`, '');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: any): void {
    if (this.isPhone) {
      // Case: dropdown changed
      if (event?.value && event.originalEvent) {
        this.selectedCountry = event.value;
        this.onChange(`+${this.selectedCountry.dial}${this.value}`);
      }
      // Case: user typed in phone input
      else if (event?.target) {
        this.value = (event.target as HTMLInputElement).value;
        this.onChange(`+${this.selectedCountry.dial}${this.value}`);
      }
    } else {
      const inputValue = (event.target as HTMLInputElement).value;
      this.value = inputValue;
      this.onChange(inputValue);
    }
  }
  //form input validation
  isInvalid(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
