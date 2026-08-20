import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StadiumService } from '../../../core/services/stadium.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-stadium-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './stadium-form.html',
  styleUrl: './stadium-form.scss',
})
export class StadiumForm {
  private fb = inject(FormBuilder);
  private stadiumService = inject(StadiumService);
  private toast = inject(ToastService);
  private router = inject(Router);

  loading = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    capacity: [10, [Validators.required, Validators.min(1)]],
    fieldType: ['sintetico', Validators.required],
    pricePerHour: [50, [Validators.required, Validators.min(1)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.stadiumService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.toast.success('Cancha registrada correctamente');
        this.router.navigate(['/stadiums']);
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }
}
