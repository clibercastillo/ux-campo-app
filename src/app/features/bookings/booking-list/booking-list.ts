import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.scss',
})
export class BookingList {
  private bookingService = inject(BookingService);
  private toast = inject(ToastService);

  bookings = signal<Booking[]>([]);
  loading = signal(true);
  actionLoadingId = signal<number | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.bookingService.findMine().subscribe({
      next: (data) => {
        this.bookings.set(data.sort((a, b) => b.id - a.id));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  confirm(b: Booking): void {
    this.actionLoadingId.set(b.id);
    this.bookingService.confirm(b.id).subscribe({
      next: () => {
        this.toast.success('Reserva confirmada');
        this.load();
      },
      error: () => this.actionLoadingId.set(null),
      complete: () => this.actionLoadingId.set(null),
    });
  }

  cancel(b: Booking): void {
    this.actionLoadingId.set(b.id);
    this.bookingService.cancel(b.id).subscribe({
      next: () => {
        this.toast.success('Reserva cancelada');
        this.load();
      },
      error: () => this.actionLoadingId.set(null),
      complete: () => this.actionLoadingId.set(null),
    });
  }

  complete(b: Booking): void {
    this.actionLoadingId.set(b.id);
    this.bookingService.complete(b.id).subscribe({
      next: () => {
        this.toast.success('Reserva completada');
        this.load();
      },
      error: () => this.actionLoadingId.set(null),
      complete: () => this.actionLoadingId.set(null),
    });
  }

  statusClass(status: string): string {
    return 'badge-' + status.toLowerCase();
  }
}
