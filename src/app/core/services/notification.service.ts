import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, startWith, switchMap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppNotification } from '../models/notification.model';

const LAST_SEEN_KEY = 'campo_notifications_last_seen';
const POLL_INTERVAL_MS = 30000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly notificationsSignal = signal<AppNotification[]>([]);
  private readonly lastSeenAtSignal = signal<number>(
    Number(localStorage.getItem(LAST_SEEN_KEY)) || 0
  );

  readonly notifications = computed(() => this.notificationsSignal());

  readonly unreadCount = computed(
    () =>
      this.notificationsSignal().filter(
        (n) => new Date(n.createdAt).getTime() > this.lastSeenAtSignal()
      ).length
  );

  constructor(private http: HttpClient) {}

  findMine(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${environment.notificationsUrl}/mine`);
  }

  /** Empieza el polling de notificaciones (llamar una vez, ej. desde el navbar). */
  startPolling(): Observable<AppNotification[]> {
    return interval(POLL_INTERVAL_MS).pipe(
      startWith(0),
      switchMap(() => this.findMine().pipe(catchError(() => of([] as AppNotification[])))),
    );
  }

  setNotifications(data: AppNotification[]): void {
    this.notificationsSignal.set(data);
  }

  /** Marca todo como leído (llamar al entrar a /notifications). */
  markAllRead(): void {
    const now = Date.now();
    localStorage.setItem(LAST_SEEN_KEY, String(now));
    this.lastSeenAtSignal.set(now);
  }

  /** Limpia el estado al hacer logout. */
  reset(): void {
    this.notificationsSignal.set([]);
  }
}