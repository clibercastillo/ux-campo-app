# campo-app

Frontend Angular 21 (LTS) para el sistema de reservas de canchas sintéticas. Consume los 4 microservicios: `ms-auth`, `ms-stadium`, `ms-bookings`, `ms-notifications`.

## Requisitos

- Node.js 20+ (recomendado 22)
- npm 10+
- Los 4 microservicios corriendo en:
  - `ms-auth` → `http://localhost:8080`
  - `ms-stadium` → `http://localhost:8081`
  - `ms-bookings` → `http://localhost:8082`
  - `ms-notifications` → `http://localhost:8083`

## Instalación

```bash
npm install
```

## Levantar en desarrollo

```bash
npm start
```

Abre `http://localhost:4200`

## Build de producción

```bash
npm run build
```

Los archivos quedan en `dist/campo-app/browser`.

⚠️ Antes de desplegar a producción, edita `src/environments/environment.prod.ts` con las URLs reales de tus microservicios.

## Estructura del proyecto

```
src/app/
├── core/
│   ├── models/        # Interfaces TS (auth, stadium, booking, notification)
│   ├── services/       # AuthService, StadiumService, BookingService, NotificationService, ToastService
│   ├── interceptors/    # JWT interceptor (adjunta token, maneja 401)
│   └── guards/          # authGuard (protege rutas privadas)
├── shared/components/
│   ├── navbar/          # Barra superior (desktop) + tab bar inferior (móvil)
│   └── toast/            # Notificaciones visuales de éxito/error
├── features/
│   ├── auth/              # login, register
│   ├── stadiums/           # stadium-list, stadium-form
│   ├── bookings/            # booking-list, booking-form
│   └── notifications/        # notification-list
├── app.routes.ts        # Rutas con lazy loading
├── app.config.ts         # Providers: router, HttpClient + interceptor
└── app.ts / app.html      # Shell: navbar + router-outlet + toasts
```

## Flujo funcional

1. **Registro/Login** (`/register`, `/login`) → guarda JWT en `localStorage`
2. **Canchas** (`/stadiums`) → listar, buscar por ciudad, crear nueva cancha
3. **Reservar** (`/bookings/new`) → elige cancha, fecha y horario, calcula precio en vivo
4. **Mis reservas** (`/bookings`) → confirmar / cancelar / completar según el estado (`PENDING → CONFIRMED → COMPLETED`, o `CANCELLED`)
5. **Notificaciones** (`/notifications`) → historial de avisos generados por `ms-notifications` vía RabbitMQ

## Diseño

- Tema oscuro moderno con variables CSS (`styles.scss`)
- Mobile-first: navbar superior en desktop, tab bar inferior fija en móvil
- Toasts de feedback para cada acción (éxito/error)
- Componentes standalone, lazy-loaded por ruta, signals para estado reactivo
# walon-app
# walon-app
