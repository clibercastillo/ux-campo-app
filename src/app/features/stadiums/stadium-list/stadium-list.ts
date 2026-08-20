import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StadiumService } from '../../../core/services/stadium.service';
import { Stadium } from '../../../core/models/stadium.model';
import { ToastService } from '../../../core/services/toast.service';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-stadium-list',
  standalone: true,
  imports: [FormsModule, RouterLink, Skeleton],
  templateUrl: './stadium-list.html',
  styleUrl: './stadium-list.scss',
})
export class StadiumList {
  private stadiumService = inject(StadiumService);
  private toast = inject(ToastService);
  private router = inject(Router);

  stadiums = signal<Stadium[]>([]);
  loading = signal(true);
  cityFilter = signal('');

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.stadiumService.findAll().subscribe({
      next: (data) => {
        this.stadiums.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  search(): void {
    const city = this.cityFilter().trim();
    this.loading.set(true);
    const request$ = city ? this.stadiumService.findByCity(city) : this.stadiumService.findAll();
    request$.subscribe({
      next: (data) => {
        this.stadiums.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  goToBooking(stadium: Stadium): void {
    this.router.navigate(['/bookings/new'], { queryParams: { stadiumId: stadium.id } });
  }
}
