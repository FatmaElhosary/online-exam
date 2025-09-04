import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPasswords(
  password: string,
  confirmPassword: string
): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const passControl = formGroup.get(password);
    const confirmControl = formGroup.get(confirmPassword);

    if (!passControl || !confirmControl) return null;

    // if confirm already has other errors, skip overwrite
    if (confirmControl.errors && !confirmControl.errors['mismatch']) {
      return null;
    }

    if (passControl.value !== confirmControl.value) {
      confirmControl.setErrors({ mismatch: true }); // ✅ error set on rePassword
    } else {
      confirmControl.setErrors(null);
    }

    return null;
  };
}
