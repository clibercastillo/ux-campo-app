import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingRequest } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  create(request: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(environment.bookingsUrl, request);
  }

  findMine(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.bookingsUrl}/mine`);
  }

  // ⚠️ Necesita endpoint nuevo en ms-bookings:
  // GET /bookings/stadium/{id}?date=yyyy-MM-dd
  findByStadiumAndDate(stadiumId: number, date: string): Observable<Booking[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<Booking[]>(`${environment.bookingsUrl}/stadium/${stadiumId}`, { params });
  }

  confirm(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${environment.bookingsUrl}/${id}/confirm`, {});
  }

  cancel(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${environment.bookingsUrl}/${id}/cancel`, {});
  }

  complete(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${environment.bookingsUrl}/${id}/complete`, {});
  }
}