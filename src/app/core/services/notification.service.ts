import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppNotification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private http: HttpClient) {}

  findMine(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${environment.notificationsUrl}/mine`);
  }
}
