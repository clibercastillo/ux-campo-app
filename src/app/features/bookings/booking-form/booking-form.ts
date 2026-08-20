import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { StadiumService } from '../../../core/services/stadium.service';
import { Stadium } from '../../../core/models/stadium.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss',
})
export class BookingForm {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private stadiumService = inject(StadiumService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);

  loading = signal(false);
  loadingStadiums = signal(true);
  stadiums = signal<Stadium[]>([]);
  selectedStadium = signal<Stadium | null>(null);

  form = this.fb.nonNullable.group({
    stadiumId: [0, [Validators.required, Validators.min(1)]],
    bookingDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
  });

  ngOnInit(): void {
    this.stadiumService.findAll().subscribe({
      next: (data) => {
        this.stadiums.set(data);
        this.loadingStadiums.set(false);

        const preselected = Number(this.route.snapshot.queryParamMap.get('stadiumId'));
        if (preselected) {
          this.form.controls.stadiumId.setValue(preselected);
          this.onStadiumChange();
        }
      },
      error: () => this.loadingStadiums.set(false),
    });
  }

  onStadiumChange(): void {
    const id = this.form.controls.stadiumId.value;
    const found = this.stadiums().find((s) => s.id === Number(id)) ?? null;
    this.selectedStadium.set(found);
  }

  estimatedTotal(): number {
    const stadium = this.selectedStadium();
    const { startTime, endTime } = this.form.getRawValue();
    if (!stadium || !startTime || !endTime) return 0;

    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const hours = (eh * 60 + em - (sh * 60 + sm)) / 60;
    return hours > 0 ? Math.round(hours * stadium.pricePerHour * 100) / 100 : 0;
  }

  submit(): void {
    if (this.form.invalid || this.form.controls.stadiumId.value === 0) {
      this.form.markAllAsTouched();
      this.toast.error('Selecciona una cancha válida');
      return;
    }

    const raw = this.form.getRawValue();
    const payload = {
      stadiumId: Number(raw.stadiumId),
      bookingDate: raw.bookingDate,
      startTime: `${raw.startTime}:00`,
      endTime: `${raw.endTime}:00`,
    };

    this.loading.set(true);
    this.bookingService.create(payload).subscribe({
      next: () => {
        this.toast.success('Reserva creada correctamente');
        this.router.navigate(['/bookings']);
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }
}
