import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => '/bookings/new?stadiumId=1',
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.Register),
  },

  {
    path: 'stadiums',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/stadiums/stadium-list/stadium-list').then((m) => m.StadiumList),
  },
  {
    path: 'stadiums/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/stadiums/stadium-form/stadium-form').then((m) => m.StadiumForm),
  },

  {
    path: 'bookings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/bookings/booking-list/booking-list').then((m) => m.BookingList),
  },
  {
    path: 'bookings/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/bookings/booking-form/booking-form').then((m) => m.BookingForm),
  },

  {
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/notifications/notification-list').then((m) => m.NotificationList),
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: () => '/bookings/new?stadiumId=1',
  },
];
