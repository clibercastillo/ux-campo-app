import { Injectable, signal } from '@angular/core';

export interface ConfirmRequest {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  readonly request = signal<ConfirmRequest | null>(null);
  private resolver: ((value: boolean) => void) | null = null;

  ask(request: ConfirmRequest): Promise<boolean> {
    this.request.set(request);
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  resolve(value: boolean): void {
    this.resolver?.(value);
    this.resolver = null;
    this.request.set(null);
  }
}
