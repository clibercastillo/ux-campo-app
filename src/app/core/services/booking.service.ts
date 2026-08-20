import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
