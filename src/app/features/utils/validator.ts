import { WritableSignal } from '@angular/core';

export function validateAlphanumeric(value: string, name: WritableSignal<string>, errors: WritableSignal<string[]>): void {
  const errs: string[] = [];
  if (value.length > 20) {
    errs.push('Max 20 characters');
  }
  if (!/^[a-zA-Z0-9 .]*$/.test(value)) {
    errs.push('Only alphanumeric characters allowed');
  }
  if (errs.length > 0) {
    errors.set(errs);
    return;
  }
  errors.set([]);
  name.set(value);
}