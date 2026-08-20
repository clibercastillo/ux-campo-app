import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, Skeleton],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.scss',
})
export class BookingList {
  private bookingService = inject(BookingService);
  private toast = inject(ToastService);
  private confirmService = inject(ConfirmService);

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

  async cancel(b: Booking): Promise<void> {
    const ok = await this.confirmService.ask({
      title: 'Cancelar reserva',
      message: `¿Seguro que quieres cancelar la reserva #${b.id}? Esta acción no se puede deshacer.`,
      confirmLabel: 'Sí, cancelar',
      danger: true,
    });
    if (!ok) return;

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
