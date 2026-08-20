import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { ToastContainer } from './shared/components/toast/toast';
import { ConfirmDialog } from './shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, ToastContainer, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
