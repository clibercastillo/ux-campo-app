import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Stadium, StadiumRequest } from '../models/stadium.model';

@Injectable({ providedIn: 'root' })
export class StadiumService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(environment.stadiumsUrl);
  }

  findById(id: number): Observable<Stadium> {
    return this.http.get<Stadium>(`${environment.stadiumsUrl}/${id}`);
  }

  findByCity(city: string): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(`${environment.stadiumsUrl}/city/${city}`);
  }

  create(request: StadiumRequest): Observable<Stadium> {
    return this.http.post<Stadium>(environment.stadiumsUrl, request);
  }

  update(id: number, request: StadiumRequest): Observable<Stadium> {
    return this.http.put<Stadium>(`${environment.stadiumsUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.stadiumsUrl}/${id}`);
  }
}
